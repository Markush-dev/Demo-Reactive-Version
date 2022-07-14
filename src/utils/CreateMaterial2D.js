import * as THREE from 'three'

// CREATE THE VIDEO BACKGROUND:
export function createMaterial2d(threeTexture, isTransparent) { //MT216 : we put the creation of the video material in a func because we will also use it for the frame
    return new THREE.RawShaderMaterial({
        depthWrite: false,
        depthTest: false,
        transparent: isTransparent,
        vertexShader: "attribute vec2 position;\n\
          varying vec2 vUV;\n\
          void main(void){\n\
            gl_Position=vec4(position, 0., 1.);\n\
            vUV=0.5+0.5*position;\n\
          }",
        fragmentShader: "precision lowp float;\n\
          uniform sampler2D samplerVideo;\n\
          varying vec2 vUV;\n\
          void main(void){\n\
            gl_FragColor = texture2D(samplerVideo, vUV);\n\
          }",
        uniforms: {
            samplerVideo: { value: threeTexture }
        }
    });
}