# 🔐 Generador de Contraseñas Seguras en Python

Este proyecto contiene un algoritmo robusto para generar contraseñas seguras que cumple con los más altos estándares de seguridad.

## 📋 Características Principales

### ✅ Criterios de Seguridad
- **Longitud mínima**: 12 caracteres (configurable)
- **Diversidad de caracteres**:
  - Al menos 1 letra mayúscula (A-Z)
  - Al menos 1 letra minúscula (a-z)
  - Al menos 1 número (0-9)
  - Al menos 1 carácter especial (!@#$%^&*()_+-={}[]|;:,.<>?)

### 🛡️ Protecciones Avanzadas
- **Evita secuencias comunes**: abc, 123, qwerty, etc.
- **Bloquea palabras comunes**: password, admin, etc.
- **Previene repeticiones excesivas**: No más de 2 caracteres iguales consecutivos
- **Generación criptográficamente segura**: Usa el módulo `secrets` en lugar de `random`

## 📁 Archivos del Proyecto

### 1. `generador_contraseñas_seguras.py`
**Algoritmo principal** que contiene la clase `GeneradorContraseñasSeguras` con todas las funcionalidades.

### 2. `generador_interactivo.py`
**Interfaz interactiva** que permite usar el generador de manera amigable con menús y opciones.

## 🚀 Uso Rápido

### Ejecución Básica
```bash
python3 generador_contraseñas_seguras.py
```

### Ejecución Interactiva
```bash
python3 generador_interactivo.py
```

## 💻 Ejemplos de Código

### Ejemplo 1: Generar una contraseña simple
```python
from generador_contraseñas_seguras import GeneradorContraseñasSeguras

generador = GeneradorContraseñasSeguras()

# Generar contraseña de 16 caracteres
contraseña = generador.generar_contraseña(16)
print(f"Contraseña segura: {contraseña}")
```

### Ejemplo 2: Generar múltiples contraseñas
```python
# Generar 5 contraseñas de 12 caracteres cada una
contraseñas = generador.generar_multiples_contraseñas(5, 12)

for i, pwd in enumerate(contraseñas, 1):
    print(f"Contraseña {i}: {pwd}")
```

### Ejemplo 3: Evaluar una contraseña existente
```python
# Evaluar la fortaleza de una contraseña
evaluacion = generador.evaluar_fortaleza("MiContraseña123!")

print(f"Nivel: {evaluacion['nivel']}")
print(f"Puntuación: {evaluacion['puntuacion']:.1f}%")
```

## 🔧 API de la Clase GeneradorContraseñasSeguras

### Métodos Principales

#### `generar_contraseña(longitud=12)`
Genera una contraseña segura con la longitud especificada.
- **Parámetros**: `longitud` (int) - Longitud de la contraseña (mínimo 12)
- **Retorna**: `str` - Contraseña segura generada
- **Lanza**: `ValueError` si la longitud es menor a 12

#### `generar_multiples_contraseñas(cantidad=5, longitud=12)`
Genera múltiples contraseñas seguras.
- **Parámetros**: 
  - `cantidad` (int) - Número de contraseñas a generar
  - `longitud` (int) - Longitud de cada contraseña
- **Retorna**: `List[str]` - Lista de contraseñas generadas

#### `evaluar_fortaleza(contraseña)`
Evalúa la fortaleza de una contraseña y proporciona retroalimentación detallada.
- **Parámetros**: `contraseña` (str) - Contraseña a evaluar
- **Retorna**: `dict` - Diccionario con evaluación completa

### Estructura del Diccionario de Evaluación
```python
{
    'longitud_suficiente': bool,
    'tiene_mayusculas': bool,
    'tiene_minusculas': bool,
    'tiene_numeros': bool,
    'tiene_especiales': bool,
    'sin_secuencias_prohibidas': bool,
    'sin_palabras_comunes': bool,
    'sin_repeticiones_excesivas': bool,
    'puntuacion': float,  # 0-100
    'nivel': str  # 'Muy Débil', 'Débil', 'Moderada', 'Fuerte', 'Muy Fuerte'
}
```

## 🛡️ Seguridad y Mejores Prácticas

### Aspectos de Seguridad Implementados

1. **Generación Criptográficamente Segura**
   - Usa `secrets.choice()` en lugar de `random.choice()`
   - Implementa mezcla segura de caracteres

2. **Validación Exhaustiva**
   - Verifica todos los criterios de seguridad
   - Detecta patrones predecibles
   - Identifica palabras comunes

3. **Distribución Equilibrada**
   - Garantiza representación de todos los tipos de caracteres
   - Evita agrupaciones predecibles

### Configuraciones de Seguridad

#### Secuencias Prohibidas
El algoritmo detecta y evita automáticamente:
- Secuencias alfabéticas: abc, bcd, xyz
- Secuencias numéricas: 123, 234, 789
- Patrones de teclado: qwerty, asdf, zxcv

#### Palabras Comunes Bloqueadas
Lista predefinida que incluye:
- password, contraseña, admin
- login, access, secret
- test, demo, sample
- Y muchas más...

## 📊 Niveles de Fortaleza

| Puntuación | Nivel | Descripción |
|------------|-------|-------------|
| 90-100% | Muy Fuerte | Cumple todos los criterios de seguridad |
| 75-89% | Fuerte | Cumple la mayoría de criterios |
| 50-74% | Moderada | Cumple criterios básicos |
| 25-49% | Débil | Faltan varios criterios importantes |
| 0-24% | Muy Débil | No cumple criterios básicos |

## ⚡ Rendimiento

- **Velocidad**: Genera contraseñas en microsegundos
- **Memoria**: Uso mínimo de memoria
- **Escalabilidad**: Puede generar miles de contraseñas sin problemas

## 🔍 Casos de Uso

### Para Desarrolladores
```python
# Integrar en sistemas de registro
def crear_contraseña_temporal():
    generador = GeneradorContraseñasSeguras()
    return generador.generar_contraseña(12)
```

### Para Administradores de Sistema
```python
# Generar contraseñas para múltiples usuarios
def generar_contraseñas_usuarios(usuarios):
    generador = GeneradorContraseñasSeguras()
    return {
        usuario: generador.generar_contraseña(16) 
        for usuario in usuarios
    }
```

### Para Auditorías de Seguridad
```python
# Evaluar contraseñas existentes
def auditar_contraseñas(lista_contraseñas):
    generador = GeneradorContraseñasSeguras()
    resultados = []
    
    for pwd in lista_contraseñas:
        evaluacion = generador.evaluar_fortaleza(pwd)
        if evaluacion['puntuacion'] < 75:
            resultados.append({
                'contraseña': pwd,
                'problema': evaluacion['nivel'],
                'puntuacion': evaluacion['puntuacion']
            })
    
    return resultados
```

## 🐛 Resolución de Problemas

### Errores Comunes

1. **ValueError: La longitud mínima debe ser 12**
   - Solución: Especifica una longitud ≥ 12 caracteres

2. **Contraseñas repetidas**
   - El algoritmo usa generación criptográficamente segura
   - Las repeticiones son extremadamente improbables

3. **Rendimiento lento**
   - Para longitudes muy grandes (>100), el tiempo puede aumentar
   - Considera usar longitudes entre 12-32 para uso normal

## 📈 Extensiones Posibles

### Funcionalidades Futuras
- [ ] Configuración personalizada de caracteres
- [ ] Exportación a archivos cifrados
- [ ] Integración con gestores de contraseñas
- [ ] API REST para servicios web
- [ ] Interfaz gráfica (GUI)

### Personalización
```python
# Ejemplo de extensión personalizada
class GeneradorPersonalizado(GeneradorContraseñasSeguras):
    def __init__(self):
        super().__init__()
        # Añadir caracteres personalizados
        self.especiales += "€£¥§"
        # Excluir caracteres ambiguos
        self.numeros = self.numeros.replace('0', '').replace('1', '')
```

## 📞 Soporte

Para preguntas, sugerencias o reportes de errores:
1. Revisa este README primero
2. Ejecuta los ejemplos de código
3. Verifica que estés usando Python 3.6+

## 🔒 Disclaimer de Seguridad

Este generador implementa las mejores prácticas de seguridad conocidas al momento de su creación. Sin embargo:

- Mantén tus contraseñas privadas y seguras
- Usa gestores de contraseñas para almacenamiento
- Activa la autenticación de dos factores cuando sea posible
- Actualiza contraseñas importantes regularmente

---

**¡Mantén tus datos seguros con contraseñas robustas! 🔐**