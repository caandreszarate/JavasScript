#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador Interactivo de Contraseñas Seguras
===========================================

Script interactivo que permite al usuario personalizar la generación de contraseñas.
"""

from generador_contraseñas_seguras import GeneradorContraseñasSeguras
import sys


def mostrar_menu():
    """Muestra el menú principal."""
    print("\n" + "="*50)
    print("   GENERADOR INTERACTIVO DE CONTRASEÑAS")
    print("="*50)
    print("1. Generar una contraseña personalizada")
    print("2. Generar múltiples contraseñas")
    print("3. Evaluar una contraseña existente")
    print("4. Configurar caracteres personalizados")
    print("5. Mostrar consejos de seguridad")
    print("0. Salir")
    print("-" * 50)


def solicitar_longitud():
    """Solicita la longitud de la contraseña al usuario."""
    while True:
        try:
            longitud = int(input("Ingresa la longitud deseada (mínimo 12): "))
            if longitud < 12:
                print("❌ Error: La longitud mínima es de 12 caracteres.")
                continue
            if longitud > 128:
                print("⚠️  Advertencia: Longitudes muy grandes pueden ser innecesarias.")
                confirmar = input("¿Continuar? (s/n): ").lower()
                if confirmar != 's':
                    continue
            return longitud
        except ValueError:
            print("❌ Error: Por favor ingresa un número válido.")


def solicitar_cantidad():
    """Solicita la cantidad de contraseñas a generar."""
    while True:
        try:
            cantidad = int(input("¿Cuántas contraseñas generar? (1-20): "))
            if 1 <= cantidad <= 20:
                return cantidad
            else:
                print("❌ Error: Ingresa un número entre 1 y 20.")
        except ValueError:
            print("❌ Error: Por favor ingresa un número válido.")


def generar_contraseña_personalizada(generador):
    """Genera una contraseña con parámetros personalizados."""
    print("\n--- GENERACIÓN PERSONALIZADA ---")
    
    longitud = solicitar_longitud()
    
    print(f"\n🔄 Generando contraseña de {longitud} caracteres...")
    try:
        contraseña = generador.generar_contraseña(longitud)
        evaluacion = generador.evaluar_fortaleza(contraseña)
        
        print(f"\n✅ Contraseña generada: {contraseña}")
        print(f"🔒 Nivel de seguridad: {evaluacion['nivel']} ({evaluacion['puntuacion']:.1f}%)")
        
        # Mostrar detalles de la evaluación
        print("\n📊 Detalles de la evaluación:")
        criterios = [
            ("Longitud suficiente", evaluacion['longitud_suficiente']),
            ("Contiene mayúsculas", evaluacion['tiene_mayusculas']),
            ("Contiene minúsculas", evaluacion['tiene_minusculas']),
            ("Contiene números", evaluacion['tiene_numeros']),
            ("Contiene especiales", evaluacion['tiene_especiales']),
            ("Sin secuencias obvias", evaluacion['sin_secuencias_prohibidas']),
            ("Sin palabras comunes", evaluacion['sin_palabras_comunes']),
            ("Sin repeticiones", evaluacion['sin_repeticiones_excesivas'])
        ]
        
        for criterio, cumple in criterios:
            simbolo = "✅" if cumple else "❌"
            print(f"   {simbolo} {criterio}")
            
    except Exception as e:
        print(f"❌ Error al generar contraseña: {e}")


def generar_multiples_contraseñas(generador):
    """Genera múltiples contraseñas."""
    print("\n--- GENERACIÓN MÚLTIPLE ---")
    
    longitud = solicitar_longitud()
    cantidad = solicitar_cantidad()
    
    print(f"\n🔄 Generando {cantidad} contraseñas de {longitud} caracteres...")
    
    try:
        contraseñas = generador.generar_multiples_contraseñas(cantidad, longitud)
        
        print(f"\n✅ Contraseñas generadas:")
        print("-" * 60)
        
        for i, contraseña in enumerate(contraseñas, 1):
            evaluacion = generador.evaluar_fortaleza(contraseña)
            print(f"{i:2}. {contraseña:<30} [{evaluacion['nivel']}]")
            
    except Exception as e:
        print(f"❌ Error al generar contraseñas: {e}")


def evaluar_contraseña_existente(generador):
    """Evalúa una contraseña proporcionada por el usuario."""
    print("\n--- EVALUACIÓN DE CONTRASEÑA ---")
    
    contraseña = input("Ingresa la contraseña a evaluar: ")
    
    if not contraseña.strip():
        print("❌ Error: No se ingresó ninguna contraseña.")
        return
    
    evaluacion = generador.evaluar_fortaleza(contraseña)
    
    print(f"\n📊 Evaluación de la contraseña: '{contraseña}'")
    print(f"🔒 Nivel de seguridad: {evaluacion['nivel']} ({evaluacion['puntuacion']:.1f}%)")
    
    print("\n📋 Detalles:")
    criterios = [
        ("Longitud suficiente (≥12)", evaluacion['longitud_suficiente']),
        ("Contiene mayúsculas", evaluacion['tiene_mayusculas']),
        ("Contiene minúsculas", evaluacion['tiene_minusculas']),
        ("Contiene números", evaluacion['tiene_numeros']),
        ("Contiene especiales", evaluacion['tiene_especiales']),
        ("Sin secuencias obvias", evaluacion['sin_secuencias_prohibidas']),
        ("Sin palabras comunes", evaluacion['sin_palabras_comunes']),
        ("Sin repeticiones excesivas", evaluacion['sin_repeticiones_excesivas'])
    ]
    
    for criterio, cumple in criterios:
        simbolo = "✅" if cumple else "❌"
        print(f"   {simbolo} {criterio}")
    
    # Sugerencias de mejora
    if evaluacion['puntuacion'] < 100:
        print("\n💡 Sugerencias de mejora:")
        if not evaluacion['longitud_suficiente']:
            print("   • Aumenta la longitud a al menos 12 caracteres")
        if not evaluacion['tiene_mayusculas']:
            print("   • Añade al menos una letra mayúscula")
        if not evaluacion['tiene_minusculas']:
            print("   • Añade al menos una letra minúscula")
        if not evaluacion['tiene_numeros']:
            print("   • Añade al menos un número")
        if not evaluacion['tiene_especiales']:
            print("   • Añade al menos un carácter especial (!@#$%^&*)")
        if not evaluacion['sin_secuencias_prohibidas']:
            print("   • Evita secuencias como 'abc', '123', 'qwerty'")
        if not evaluacion['sin_palabras_comunes']:
            print("   • Evita palabras comunes como 'password', 'admin'")
        if not evaluacion['sin_repeticiones_excesivas']:
            print("   • Evita repetir el mismo carácter consecutivamente")


def mostrar_consejos_seguridad():
    """Muestra consejos de seguridad para contraseñas."""
    print("\n" + "="*60)
    print("           CONSEJOS DE SEGURIDAD PARA CONTRASEÑAS")
    print("="*60)
    
    consejos = [
        "🔐 Usa al menos 12 caracteres (mejor 16 o más)",
        "🔤 Combina mayúsculas, minúsculas, números y símbolos",
        "🚫 Evita información personal (nombres, fechas, direcciones)",
        "🔄 Usa contraseñas únicas para cada cuenta importante",
        "📱 Considera usar un gestor de contraseñas",
        "🔒 Activa la autenticación de dos factores cuando sea posible",
        "⏰ Cambia contraseñas importantes cada 3-6 meses",
        "👀 No compartas contraseñas ni las escribas en lugares visibles",
        "🌐 Ten especial cuidado con las contraseñas en redes públicas",
        "💾 Haz copias de seguridad de tus contraseñas de forma segura"
    ]
    
    for i, consejo in enumerate(consejos, 1):
        print(f"{i:2}. {consejo}")
    
    print("\n" + "="*60)
    print("   ¡Recuerda: Una buena contraseña es tu primera línea de defensa!")
    print("="*60)


def configurar_caracteres_personalizados(generador):
    """Permite personalizar los conjuntos de caracteres (funcionalidad futura)."""
    print("\n--- CONFIGURACIÓN PERSONALIZADA ---")
    print("🚧 Esta funcionalidad estará disponible en una versión futura.")
    print("📧 Envía sugerencias sobre qué configuraciones te gustaría tener.")
    
    print(f"\nConfiguración actual:")
    print(f"• Mayúsculas: {generador.mayusculas}")
    print(f"• Minúsculas: {generador.minusculas}")
    print(f"• Números: {generador.numeros}")
    print(f"• Especiales: {generador.especiales}")


def main():
    """Función principal del programa interactivo."""
    generador = GeneradorContraseñasSeguras()
    
    print("¡Bienvenido al Generador de Contraseñas Seguras! 🔐")
    
    while True:
        mostrar_menu()
        
        try:
            opcion = input("Selecciona una opción (0-5): ").strip()
            
            if opcion == "1":
                generar_contraseña_personalizada(generador)
            elif opcion == "2":
                generar_multiples_contraseñas(generador)
            elif opcion == "3":
                evaluar_contraseña_existente(generador)
            elif opcion == "4":
                configurar_caracteres_personalizados(generador)
            elif opcion == "5":
                mostrar_consejos_seguridad()
            elif opcion == "0":
                print("\n👋 ¡Gracias por usar el Generador de Contraseñas Seguras!")
                print("🔒 Recuerda mantener tus contraseñas seguras y privadas.")
                sys.exit(0)
            else:
                print("❌ Opción no válida. Por favor selecciona una opción del 0 al 5.")
                
        except KeyboardInterrupt:
            print("\n\n👋 ¡Hasta luego!")
            sys.exit(0)
        except Exception as e:
            print(f"❌ Error inesperado: {e}")
            
        input("\nPresiona Enter para continuar...")


if __name__ == "__main__":
    main()