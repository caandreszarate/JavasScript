#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Ejemplos Prácticos de Uso del Generador de Contraseñas Seguras
============================================================

Este archivo contiene ejemplos prácticos de cómo integrar y usar
el generador de contraseñas en diferentes escenarios.
"""

from generador_contraseñas_seguras import GeneradorContraseñasSeguras
import json
import csv
from datetime import datetime


def ejemplo_basico():
    """Ejemplo básico de generación de contraseñas."""
    print("=== EJEMPLO 1: USO BÁSICO ===")
    
    generador = GeneradorContraseñasSeguras()
    
    # Generar una contraseña simple
    contraseña = generador.generar_contraseña(14)
    print(f"Contraseña generada: {contraseña}")
    
    # Evaluar su fortaleza
    evaluacion = generador.evaluar_fortaleza(contraseña)
    print(f"Nivel de seguridad: {evaluacion['nivel']} ({evaluacion['puntuacion']:.1f}%)")


def ejemplo_multiples_usuarios():
    """Ejemplo para generar contraseñas para múltiples usuarios."""
    print("\n=== EJEMPLO 2: MÚLTIPLES USUARIOS ===")
    
    generador = GeneradorContraseñasSeguras()
    
    # Lista de usuarios que necesitan contraseñas
    usuarios = ['juan.perez', 'maria.garcia', 'carlos.lopez', 'ana.rodriguez']
    
    # Generar contraseñas para cada usuario
    contraseñas_usuarios = {}
    
    for usuario in usuarios:
        contraseña = generador.generar_contraseña(16)
        contraseñas_usuarios[usuario] = {
            'contraseña': contraseña,
            'fecha_creacion': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'fortaleza': generador.evaluar_fortaleza(contraseña)['nivel']
        }
    
    # Mostrar resultados
    print("Contraseñas generadas para usuarios:")
    for usuario, datos in contraseñas_usuarios.items():
        print(f"  {usuario}: {datos['contraseña']} [{datos['fortaleza']}]")
    
    return contraseñas_usuarios


def ejemplo_auditoria_seguridad():
    """Ejemplo de auditoría de contraseñas existentes."""
    print("\n=== EJEMPLO 3: AUDITORÍA DE SEGURIDAD ===")
    
    generador = GeneradorContraseñasSeguras()
    
    # Contraseñas a auditar (ejemplos de contraseñas débiles/fuertes)
    contraseñas_auditoria = [
        "123456",
        "password",
        "admin123",
        "P@ssw0rd!",
        "MiContraseña2024!",
        "qwerty123",
        "X#9mK$4nP&2vQ@8s",
        "usuario",
        "Seg1ur1d@d#2024$"
    ]
    
    print("Resultados de la auditoría:")
    print("-" * 70)
    
    contraseñas_problematicas = []
    
    for i, contraseña in enumerate(contraseñas_auditoria, 1):
        evaluacion = generador.evaluar_fortaleza(contraseña)
        
        estado = "✅" if evaluacion['puntuacion'] >= 75 else "❌"
        print(f"{i:2}. {contraseña:<20} | {evaluacion['nivel']:<12} | {evaluacion['puntuacion']:5.1f}% | {estado}")
        
        if evaluacion['puntuacion'] < 75:
            contraseñas_problematicas.append({
                'contraseña': contraseña,
                'puntuacion': evaluacion['puntuacion'],
                'nivel': evaluacion['nivel']
            })
    
    print(f"\n📊 Resumen: {len(contraseñas_problematicas)} de {len(contraseñas_auditoria)} contraseñas necesitan mejoras")
    
    return contraseñas_problematicas


def ejemplo_diferentes_longitudes():
    """Ejemplo comparando contraseñas de diferentes longitudes."""
    print("\n=== EJEMPLO 4: COMPARACIÓN POR LONGITUDES ===")
    
    generador = GeneradorContraseñasSeguras()
    longitudes = [12, 16, 20, 24, 32]
    
    print("Contraseñas generadas con diferentes longitudes:")
    print("-" * 80)
    
    for longitud in longitudes:
        contraseña = generador.generar_contraseña(longitud)
        evaluacion = generador.evaluar_fortaleza(contraseña)
        
        print(f"Longitud {longitud:2}: {contraseña:<35} [{evaluacion['nivel']}]")


def ejemplo_generacion_masiva():
    """Ejemplo de generación masiva de contraseñas."""
    print("\n=== EJEMPLO 5: GENERACIÓN MASIVA ===")
    
    generador = GeneradorContraseñasSeguras()
    
    # Generar 20 contraseñas
    cantidad = 20
    contraseñas = generador.generar_multiples_contraseñas(cantidad, 14)
    
    print(f"Generando {cantidad} contraseñas seguras:")
    print("-" * 50)
    
    # Agrupar por nivel de fortaleza
    por_nivel = {}
    for i, contraseña in enumerate(contraseñas, 1):
        evaluacion = generador.evaluar_fortaleza(contraseña)
        nivel = evaluacion['nivel']
        
        if nivel not in por_nivel:
            por_nivel[nivel] = []
        por_nivel[nivel].append(f"{i:2}. {contraseña}")
    
    # Mostrar agrupadas
    for nivel, lista in por_nivel.items():
        print(f"\n{nivel}:")
        for contraseña in lista:
            print(f"  {contraseña}")


def ejemplo_exportar_csv():
    """Ejemplo de exportación de contraseñas a CSV."""
    print("\n=== EJEMPLO 6: EXPORTACIÓN A CSV ===")
    
    generador = GeneradorContraseñasSeguras()
    
    # Generar datos para CSV
    datos = []
    servicios = ['Email', 'Banco', 'Trabajo', 'Redes Sociales', 'Cloud Storage']
    
    for servicio in servicios:
        contraseña = generador.generar_contraseña(16)
        evaluacion = generador.evaluar_fortaleza(contraseña)
        
        datos.append({
            'Servicio': servicio,
            'Contraseña': contraseña,
            'Longitud': len(contraseña),
            'Nivel_Fortaleza': evaluacion['nivel'],
            'Puntuacion': f"{evaluacion['puntuacion']:.1f}%",
            'Fecha_Creacion': datetime.now().strftime('%Y-%m-%d')
        })
    
    # Guardar en CSV
    nombre_archivo = 'contraseñas_generadas.csv'
    with open(nombre_archivo, 'w', newline='', encoding='utf-8') as archivo:
        escritor = csv.DictWriter(archivo, fieldnames=datos[0].keys())
        escritor.writeheader()
        escritor.writerows(datos)
    
    print(f"✅ Contraseñas exportadas a: {nombre_archivo}")
    
    # Mostrar vista previa
    print("\nVista previa:")
    for dato in datos:
        print(f"  {dato['Servicio']}: {dato['Contraseña']} [{dato['Nivel_Fortaleza']}]")
    
    return nombre_archivo


def ejemplo_exportar_json():
    """Ejemplo de exportación de contraseñas a JSON."""
    print("\n=== EJEMPLO 7: EXPORTACIÓN A JSON ===")
    
    generador = GeneradorContraseñasSeguras()
    
    # Crear estructura de datos completa
    datos_json = {
        'generador_info': {
            'version': '1.0',
            'fecha_generacion': datetime.now().isoformat(),
            'total_contraseñas': 0
        },
        'contraseñas': []
    }
    
    # Generar contraseñas para diferentes propósitos
    propósitos = [
        {'nombre': 'Administrador_Sistema', 'longitud': 20},
        {'nombre': 'Usuario_Normal', 'longitud': 14},
        {'nombre': 'API_Token', 'longitud': 32},
        {'nombre': 'Base_Datos', 'longitud': 18},
        {'nombre': 'Backup_Seguridad', 'longitud': 24}
    ]
    
    for propósito in propósitos:
        contraseña = generador.generar_contraseña(propósito['longitud'])
        evaluacion = generador.evaluar_fortaleza(contraseña)
        
        datos_json['contraseñas'].append({
            'id': len(datos_json['contraseñas']) + 1,
            'propósito': propósito['nombre'],
            'contraseña': contraseña,
            'longitud': propósito['longitud'],
            'evaluacion': evaluacion,
            'fecha_creacion': datetime.now().isoformat()
        })
    
    datos_json['generador_info']['total_contraseñas'] = len(datos_json['contraseñas'])
    
    # Guardar en JSON
    nombre_archivo = 'contraseñas_seguras.json'
    with open(nombre_archivo, 'w', encoding='utf-8') as archivo:
        json.dump(datos_json, archivo, indent=2, ensure_ascii=False)
    
    print(f"✅ Datos exportados a: {nombre_archivo}")
    print(f"📊 Total de contraseñas generadas: {datos_json['generador_info']['total_contraseñas']}")
    
    return nombre_archivo


def ejemplo_validacion_personalizada():
    """Ejemplo con validaciones personalizadas."""
    print("\n=== EJEMPLO 8: VALIDACIÓN PERSONALIZADA ===")
    
    class ValidadorPersonalizado(GeneradorContraseñasSeguras):
        """Generador con validaciones personalizadas."""
        
        def validar_requisitos_empresa(self, contraseña):
            """Validaciones específicas de una empresa ficticia."""
            validaciones = {
                'longitud_minima_16': len(contraseña) >= 16,
                'no_caracteres_ambiguos': not any(c in '0O1lI' for c in contraseña),
                'al_menos_3_mayusculas': sum(1 for c in contraseña if c.isupper()) >= 3,
                'al_menos_3_especiales': sum(1 for c in contraseña if c in self.especiales) >= 3,
                'no_secuencias_4_chars': not self._tiene_secuencias_largas(contraseña, 4)
            }
            
            return validaciones
        
        def _tiene_secuencias_largas(self, contraseña, longitud_max):
            """Verifica secuencias de caracteres consecutivos."""
            for i in range(len(contraseña) - longitud_max + 1):
                subcadena = contraseña[i:i + longitud_max]
                # Verificar secuencia numérica
                if subcadena.isdigit():
                    numeros = [int(c) for c in subcadena]
                    if all(numeros[j] == numeros[j-1] + 1 for j in range(1, len(numeros))):
                        return True
                # Verificar secuencia alfabética
                elif subcadena.isalpha():
                    if all(ord(subcadena[j]) == ord(subcadena[j-1]) + 1 for j in range(1, len(subcadena))):
                        return True
            return False
    
    # Usar el validador personalizado
    generador_custom = ValidadorPersonalizado()
    
    print("Generando contraseñas con validaciones empresariales:")
    for i in range(3):
        contraseña = generador_custom.generar_contraseña(18)
        validacion_std = generador_custom.evaluar_fortaleza(contraseña)
        validacion_custom = generador_custom.validar_requisitos_empresa(contraseña)
        
        print(f"\nContraseña {i+1}: {contraseña}")
        print(f"  Evaluación estándar: {validacion_std['nivel']}")
        print(f"  Validaciones empresariales:")
        
        for criterio, cumple in validacion_custom.items():
            simbolo = "✅" if cumple else "❌"
            criterio_legible = criterio.replace('_', ' ').title()
            print(f"    {simbolo} {criterio_legible}")


def main():
    """Ejecuta todos los ejemplos de uso."""
    print("🔐 EJEMPLOS PRÁCTICOS DEL GENERADOR DE CONTRASEÑAS SEGURAS")
    print("=" * 80)
    
    try:
        ejemplo_basico()
        ejemplo_multiples_usuarios()
        ejemplo_auditoria_seguridad()
        ejemplo_diferentes_longitudes()
        ejemplo_generacion_masiva()
        
        # Ejemplos de exportación
        archivo_csv = ejemplo_exportar_csv()
        archivo_json = ejemplo_exportar_json()
        
        ejemplo_validacion_personalizada()
        
        print(f"\n✅ Todos los ejemplos ejecutados correctamente!")
        print(f"📁 Archivos generados:")
        print(f"   • {archivo_csv}")
        print(f"   • {archivo_json}")
        
    except Exception as e:
        print(f"❌ Error durante la ejecución: {e}")


if __name__ == "__main__":
    main()