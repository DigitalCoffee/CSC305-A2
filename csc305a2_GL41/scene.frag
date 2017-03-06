uniform vec3 CameraPos;

uniform vec3 Ambient;
uniform vec3 Diffuse;
uniform vec3 Specular;
uniform float Shininess;

uniform int HasDiffuseMap;
uniform sampler2D DiffuseMap;

uniform sampler2DShadow ShadowMap;

out vec4 FragColor;

in vec4 fragment_color;

in vec3 normal;
in vec3 vertPos;
in vec2 fragment_texcoord;

in vec4 shadowMapCoord;

const int mode = 1;
const float screenGamma = 2.2;

void main()
{
    // TODO: Replace with Phong shading
    //FragColor = fragment_color;

	vec3 lightDir = normalize(CameraPos - vertPos);
	vec3 reflectDir = reflect(-lightDir, normal);
	vec3 viewDir = normalize(-vertPos);

	float lambertian = max(dot(lightDir,normal), 0.0);
	float specular = 0.0;

	if(lambertian > 0.0) {
		float specAngle = max(dot(reflectDir, viewDir), 0.0);
		specular = pow(specAngle, Shininess/4.0);
	}

	vec3 diffuseMap;
	if (HasDiffuseMap != 0)
		diffuseMap = texture(DiffuseMap, fragment_texcoord).rgb;
	else
		diffuseMap = Diffuse;

	float visibility = textureProj(ShadowMap, shadowMapCoord);

	vec3 colorLinear;
	if (mode == 2)		colorLinear = Ambient / 10;
	else if (mode == 3)	colorLinear = lambertian * diffuseMap;
	else if (mode == 4)	colorLinear = specular * Specular;
	else				colorLinear = min(Ambient / 10, visibility) + lambertian * diffuseMap + specular * Specular;


	FragColor = vec4(colorLinear, 1.0);
	
	//vec3 colorGammaCorrected = pow(colorLinear, vec3(1.0 / screenGamma));
	//FragColor = vec4(colorGammaCorrected, 1.0);

}