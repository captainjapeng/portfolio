<template>
  <div
    ref="containerRef"
    class="fit"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const COLORS = [
  new THREE.Color(0x96CAFA), // blue
  new THREE.Color(0x96CAFA), // blue
  new THREE.Color(0x96CAFA), // blue
  new THREE.Color(0x96CAFA), // blue
  new THREE.Color(0x96CAFA), // blue
  new THREE.Color(0xE1F1FC), // white
  new THREE.Color(0xE1F1FC), // white
  new THREE.Color(0xE1F1FC), // white
  new THREE.Color(0xE1F1FC), // white
  new THREE.Color(0xE1F1FC), // white
  new THREE.Color(0xF8D76F), // yellow
  new THREE.Color(0xFEBB6A), // orange
  new THREE.Color(0xD33F51) // red
]

const VERTEX_SHADER = `
  precision highp float;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec3 colors[${COLORS.length}];
  uniform float time;

  attribute vec3 position;
  attribute vec2 uv;
  attribute vec3 translate;
  attribute float colorIdx;
  attribute float size;

  varying vec2 vUv;
  varying vec4 vColor;

  void main() {

    vec4 mvPosition = modelViewMatrix * vec4( translate, 1.0 );
    float scale = size * 4.0 + 4.0;
    mvPosition.xyz += position * scale;
    vUv = uv;
    vColor = vec4( colors[int(colorIdx)], 1 );
    gl_Position = projectionMatrix * mvPosition;

  }
`
const FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D map;

  varying vec2 vUv;
  varying vec4 vColor;

  void main() {
    vec4 diffuseColor = texture2D( map, vUv );
    gl_FragColor = vec4( diffuseColor.xyz * vColor.xyz, diffuseColor.w );

    if ( diffuseColor.w < 0.5 ) discard;
  }
`

export default defineComponent({
  setup() {
    const containerRef = ref<HTMLDivElement>(null as any)

    let running = true,
      renderer: THREE.WebGLRenderer,
      scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      material: THREE.RawShaderMaterial,
      mesh: THREE.Mesh

    onMounted(() => {
      window.addEventListener('resize', onWindowResize)

      const { clientWidth, clientHeight } = containerRef.value
      console.log({ clientWidth, clientHeight })

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(clientWidth, clientHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      containerRef.value.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 10000)
      camera.position.set(0, 0, 3500)
      scene.add(camera)

      const light = new THREE.AmbientLight()
      scene.add(light)

      const itemGeom = new THREE.CircleGeometry(1, 16)

      const geometry = new THREE.InstancedBufferGeometry()
      geometry.index = itemGeom.index
      geometry.attributes = itemGeom.attributes

      const particleCount = 2000, translateDelta = 5
      const sizeArray = new Float32Array(particleCount)
      const translateArray = new Float32Array(particleCount * 3)
      const colorArray = new Float32Array(particleCount)
      for (let i = 0; i < particleCount; i++) {
        sizeArray[i + 0] = Math.random() * 0.5 + 0.5
        colorArray[i] = Math.round(Math.random() * (COLORS.length - 1))

        translateArray[i + 0] = Math.random() * translateDelta - (translateDelta / 2)
        translateArray[i + 1] = Math.random() * translateDelta - (translateDelta / 2)
        translateArray[i + 2] = Math.random() * translateDelta - (translateDelta / 2)
      }

      geometry.setAttribute('size', new THREE.InstancedBufferAttribute(sizeArray, 1))
      geometry.setAttribute('colorIdx', new THREE.InstancedBufferAttribute(colorArray, 1))
      geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3))

      material = new THREE.RawShaderMaterial({
        uniforms: {
          map: { value: new THREE.TextureLoader().load('/star.png') },
          time: { value: 0 },
          colors: { value: COLORS }
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        depthTest: true,
        depthWrite: true
      })
      mesh = new THREE.Mesh(geometry, material)
      mesh.scale.set(1000, 1000, 1000)
      scene.add(mesh)

      requestAnimationFrame(render)
    })

    function render() {
      if (!running) return false

      const time = performance.now() * 0.000005

      material.uniforms.time.value = time

      mesh.rotation.x = time * 0.2
      mesh.rotation.y = time * 0.4

      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }

    function onWindowResize() {
      const { clientWidth, clientHeight } = containerRef.value
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()

      renderer.setSize(clientWidth, clientHeight)
    }

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onWindowResize)
      running = false
      renderer.dispose()
    })

    return { containerRef }
  }
})
</script>

<style lang="sass" scoped>
</style>
