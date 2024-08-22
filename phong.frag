
#version 330 core
out vec4 color;

in vec3 FragPos;  
in vec3 Normal;  
  
uniform vec3 lightPos; 
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

void main()
{
    // ambient
    float ambientStr = 0.01;
    vec3 ambient = ambientStr * lightColor;

    // diffuse
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // specular
    float specularStr = 0.5;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    vec3 specular = specularStr * spec * lightColor;  

    // mix
    vec3 finalMix = (ambient + diffuse + specular) * objectColor;
    
    // If gl_Position was set correctly, this gives a totally red cube
    //color = vec4(vec3(1.f,0.f,0.f), 1.0f);
    
    // final using mix + example color
    color = vec4(finalMix, 1.0f);
} 
