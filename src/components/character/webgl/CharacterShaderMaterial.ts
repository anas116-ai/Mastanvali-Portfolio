import * as THREE from "three";

export const CharacterVertexShader = /* glsl */ `
  uniform sampler2D uDepthMap;
  uniform float uDisplacementScale;
  uniform float uTime;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDepth;

  void main() {
    vUv = uv;
    
    // Sample depth map for 3D volumetric extrusion
    vec4 depthTex = texture2D(uDepthMap, uv);
    float depth = depthTex.r * depthTex.a;
    vDepth = depth;

    // Anatomical masks based on vertical UV coordinates:
    // uv.y: 0.0 (feet/shoes) -> 1.0 (head)
    float isHead = smoothstep(0.72, 0.96, uv.y);
    float isTorso = smoothstep(0.48, 0.72, uv.y) * smoothstep(0.78, 0.62, uv.y);
    float isLaptop = smoothstep(0.18, 0.48, uv.x) * smoothstep(0.58, 0.32, uv.x) * smoothstep(0.38, 0.58, uv.y) * smoothstep(0.64, 0.46, uv.y);

    // 1. Organic Respiration Cycle (inspired by cinematic living creatures):
    // Smooth sinusoidal chest expansion in Z and slight rhythmic shoulder rise in Y
    float breathWave = sin(uTime * 1.3);
    float naturalBreathZ = breathWave * 0.038 * isTorso;
    float naturalBreathY = breathWave * 0.012 * isTorso;

    // 2. Fluid Organic Spine & Head Micro-Sway:
    float headSwayX = (sin(uTime * 0.7) * 0.012 + uMouse.x * 0.032) * isHead;
    float headSwayY = (cos(uTime * 0.6) * 0.008 + uMouse.y * 0.022) * isHead;

    // 3. Floating Laptop Micro-Bobbing:
    float laptopFloat = cos(uTime * 1.3) * 0.010 * isLaptop;

    // Assemble 3D displaced vertex position (legs & trousers stay firmly grounded)
    vec3 displacedPosition = position;
    displacedPosition.z += (depth * uDisplacementScale) + naturalBreathZ + laptopFloat;
    displacedPosition.y += naturalBreathY + headSwayY;
    displacedPosition.x += headSwayX;

    vec4 modelViewPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
    vViewPosition = -modelViewPosition.xyz;
    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

export const CharacterFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform sampler2D uNormalMap;
  
  
  uniform vec3 uLightPosition;
  uniform float uTime;
  uniform float uLightIntensity;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDepth;

  void main() {
    // 1. Razor-sharp diffuse texture sampling
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Clean Alpha discard (eliminates edge halos and fringing)
    if (texColor.a < 0.08) {
      discard;
    }

    // Normal mapping for realistic 3D surface depth
    vec4 normalTex = texture2D(uNormalMap, vUv);
    vec3 unpackedNormal = normalize(normalTex.rgb * 2.0 - 1.0);
    vec3 normal = normalize(vNormal + unpackedNormal * 0.35);

    vec3 viewDir = normalize(vViewPosition);

    // 2. Dynamic Directional Key Light
    vec3 lightDir = normalize(uLightPosition - vViewPosition);
    float diff = max(dot(normal, lightDir), 0.0);

    // Specular highlight (Blinn-Phong)
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 24.0);

    // 3. Clean Studio Balanced Lighting (Preserves 100% true clothing colors without artificial colored tints or pant glare)
    vec3 litColor = texColor.rgb * (0.95 + diff * 0.12 * uLightIntensity);

    gl_FragColor = vec4(litColor, texColor.a);
  }
`;

export function createCharacterShaderMaterial(
  texture: THREE.Texture,
  closedEyesTex: THREE.Texture,
  depthMap: THREE.Texture,
  normalMap: THREE.Texture
) {
  return new THREE.ShaderMaterial({
    vertexShader: CharacterVertexShader,
    fragmentShader: CharacterFragmentShader,
    uniforms: {
      uTexture: { value: texture },
      uClosedEyesTex: { value: closedEyesTex },
      uDepthMap: { value: depthMap },
      uNormalMap: { value: normalMap },
      uDisplacementScale: { value: 0.18 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      
      
      uLightPosition: { value: new THREE.Vector3(1.2, 2.4, 3.0) },
      uLightIntensity: { value: 1.0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
  });
}

export { createCharacterShaderMaterial as createCharacterMaterial };
