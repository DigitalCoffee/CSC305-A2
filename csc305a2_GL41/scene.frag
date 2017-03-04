uniform vec3 CameraPos;

uniform vec3 Ambient;
uniform vec3 Diffuse;
uniform vec3 Specular;
uniform float Shininess;

uniform int HasDiffuseMap;
uniform sampler2D DiffuseMap;

out vec4 FragColor;

void main()
{
    // TODO: Replace with Phong shading
    FragColor = vec4(1,1,1,1);
}