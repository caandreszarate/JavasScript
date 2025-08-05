#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de Contraseñas Seguras
===============================

Este algoritmo genera contraseñas seguras con los siguientes criterios:
- Mínimo 12 caracteres
- Al menos una letra mayúscula
- Al menos una letra minúscula  
- Al menos un número
- Al menos un carácter especial
- Evita patrones predecibles y secuencias comunes
"""

import secrets
import string
import re
from typing import List, Set


class GeneradorContraseñasSeguras:
    """Clase para generar contraseñas seguras y robustas."""
    
    def __init__(self):
        # Conjuntos de caracteres válidos
        self.mayusculas = string.ascii_uppercase
        self.minusculas = string.ascii_lowercase
        self.numeros = string.digits
        self.especiales = "!@#$%^&*()_+-={}[]|;:,.<>?"
        
        # Patrones a evitar (secuencias comunes)
        self.secuencias_prohibidas = {
            'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl',
            'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv',
            'uvw', 'vwx', 'wxy', 'xyz', '123', '234', '345', '456', '567', '678',
            '789', '890', 'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop',
            'asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl', 'zxc', 'xcv', 'cvb',
            'vbn', 'bnm'
        }
        
        # Palabras comunes a evitar
        self.palabras_comunes = {
            'password', 'contraseña', 'admin', 'user', 'login', 'access', 'secret',
            'pass', 'key', 'code', 'word', 'letmein', 'welcome', 'hello', 'world',
            'test', 'demo', 'sample', 'example', 'default', 'qwerty', 'asdfgh',
            'zxcvbn', '12345', '54321', 'abcdef', 'fedcba'
        }

    def generar_contraseña(self, longitud: int = 12) -> str:
        """
        Genera una contraseña segura con la longitud especificada.
        
        Args:
            longitud (int): Longitud de la contraseña (mínimo 12)
            
        Returns:
            str: Contraseña segura generada
            
        Raises:
            ValueError: Si la longitud es menor a 12
        """
        if longitud < 12:
            raise ValueError("La longitud mínima de la contraseña debe ser 12 caracteres")
        
        # Generar contraseña hasta que cumpla todos los criterios
        max_intentos = 100
        for intento in range(max_intentos):
            contraseña = self._generar_contraseña_base(longitud)
            
            if self._es_contraseña_segura(contraseña):
                return contraseña
        
        # Si no se pudo generar una contraseña segura, usar método alternativo
        return self._generar_contraseña_forzada(longitud)

    def _generar_contraseña_base(self, longitud: int) -> str:
        """Genera una contraseña base asegurando al menos un carácter de cada tipo."""
        # Asegurar al menos un carácter de cada tipo requerido
        contraseña_chars = [
            secrets.choice(self.mayusculas),
            secrets.choice(self.minusculas),
            secrets.choice(self.numeros),
            secrets.choice(self.especiales)
        ]
        
        # Completar el resto de la longitud con caracteres aleatorios
        todos_los_chars = self.mayusculas + self.minusculas + self.numeros + self.especiales
        
        for _ in range(longitud - 4):
            contraseña_chars.append(secrets.choice(todos_los_chars))
        
        # Mezclar los caracteres de forma segura
        self._mezclar_lista(contraseña_chars)
        
        return ''.join(contraseña_chars)

    def _generar_contraseña_forzada(self, longitud: int) -> str:
        """
        Método alternativo que fuerza la creación de una contraseña segura
        distribuyendo uniformemente los tipos de caracteres.
        """
        # Calcular distribución de caracteres
        chars_por_tipo = longitud // 4
        chars_extra = longitud % 4
        
        contraseña_chars = []
        
        # Agregar caracteres de cada tipo
        for i in range(chars_por_tipo):
            contraseña_chars.append(secrets.choice(self.mayusculas))
            contraseña_chars.append(secrets.choice(self.minusculas))
            contraseña_chars.append(secrets.choice(self.numeros))
            contraseña_chars.append(secrets.choice(self.especiales))
        
        # Agregar caracteres extra
        todos_los_chars = self.mayusculas + self.minusculas + self.numeros + self.especiales
        for _ in range(chars_extra):
            contraseña_chars.append(secrets.choice(todos_los_chars))
        
        # Mezclar múltiples veces para mayor aleatoriedad
        for _ in range(5):
            self._mezclar_lista(contraseña_chars)
        
        return ''.join(contraseña_chars)

    def _mezclar_lista(self, lista: List[str]) -> None:
        """Mezcla una lista usando el generador de números aleatorios seguro."""
        for i in range(len(lista) - 1, 0, -1):
            j = secrets.randbelow(i + 1)
            lista[i], lista[j] = lista[j], lista[i]

    def _es_contraseña_segura(self, contraseña: str) -> bool:
        """
        Verifica si una contraseña cumple todos los criterios de seguridad.
        
        Args:
            contraseña (str): Contraseña a verificar
            
        Returns:
            bool: True si la contraseña es segura, False en caso contrario
        """
        # Verificar longitud mínima
        if len(contraseña) < 12:
            return False
        
        # Verificar que contenga al menos un carácter de cada tipo
        if not any(c in self.mayusculas for c in contraseña):
            return False
        if not any(c in self.minusculas for c in contraseña):
            return False
        if not any(c in self.numeros for c in contraseña):
            return False
        if not any(c in self.especiales for c in contraseña):
            return False
        
        # Verificar que no contenga secuencias prohibidas
        if self._contiene_secuencias_prohibidas(contraseña):
            return False
        
        # Verificar que no contenga palabras comunes
        if self._contiene_palabras_comunes(contraseña):
            return False
        
        # Verificar que no tenga caracteres repetidos consecutivamente
        if self._tiene_repeticiones_consecutivas(contraseña):
            return False
        
        return True

    def _contiene_secuencias_prohibidas(self, contraseña: str) -> bool:
        """Verifica si la contraseña contiene secuencias prohibidas."""
        contraseña_lower = contraseña.lower()
        
        for secuencia in self.secuencias_prohibidas:
            if secuencia in contraseña_lower:
                return True
            # También verificar secuencias inversas
            if secuencia[::-1] in contraseña_lower:
                return True
        
        return False

    def _contiene_palabras_comunes(self, contraseña: str) -> bool:
        """Verifica si la contraseña contiene palabras comunes."""
        contraseña_lower = contraseña.lower()
        
        for palabra in self.palabras_comunes:
            if palabra in contraseña_lower:
                return True
        
        return False

    def _tiene_repeticiones_consecutivas(self, contraseña: str, max_repeticiones: int = 2) -> bool:
        """Verifica si hay caracteres repetidos consecutivamente."""
        contador = 1
        for i in range(1, len(contraseña)):
            if contraseña[i] == contraseña[i-1]:
                contador += 1
                if contador > max_repeticiones:
                    return True
            else:
                contador = 1
        return False

    def evaluar_fortaleza(self, contraseña: str) -> dict:
        """
        Evalúa la fortaleza de una contraseña y proporciona retroalimentación.
        
        Args:
            contraseña (str): Contraseña a evaluar
            
        Returns:
            dict: Diccionario con la evaluación de fortaleza
        """
        evaluacion = {
            'longitud_suficiente': len(contraseña) >= 12,
            'tiene_mayusculas': any(c in self.mayusculas for c in contraseña),
            'tiene_minusculas': any(c in self.minusculas for c in contraseña),
            'tiene_numeros': any(c in self.numeros for c in contraseña),
            'tiene_especiales': any(c in self.especiales for c in contraseña),
            'sin_secuencias_prohibidas': not self._contiene_secuencias_prohibidas(contraseña),
            'sin_palabras_comunes': not self._contiene_palabras_comunes(contraseña),
            'sin_repeticiones_excesivas': not self._tiene_repeticiones_consecutivas(contraseña),
            'puntuacion': 0,
            'nivel': 'Muy Débil'
        }
        
        # Calcular puntuación
        criterios_cumplidos = sum(evaluacion[key] for key in evaluacion if isinstance(evaluacion[key], bool))
        evaluacion['puntuacion'] = (criterios_cumplidos / 8) * 100
        
        # Determinar nivel de fortaleza
        if evaluacion['puntuacion'] >= 90:
            evaluacion['nivel'] = 'Muy Fuerte'
        elif evaluacion['puntuacion'] >= 75:
            evaluacion['nivel'] = 'Fuerte'
        elif evaluacion['puntuacion'] >= 50:
            evaluacion['nivel'] = 'Moderada'
        elif evaluacion['puntuacion'] >= 25:
            evaluacion['nivel'] = 'Débil'
        
        return evaluacion

    def generar_multiples_contraseñas(self, cantidad: int = 5, longitud: int = 12) -> List[str]:
        """
        Genera múltiples contraseñas seguras.
        
        Args:
            cantidad (int): Número de contraseñas a generar
            longitud (int): Longitud de cada contraseña
            
        Returns:
            List[str]: Lista de contraseñas generadas
        """
        contraseñas = []
        for _ in range(cantidad):
            contraseñas.append(self.generar_contraseña(longitud))
        return contraseñas


def main():
    """Función principal para demostrar el uso del generador de contraseñas."""
    print("=== GENERADOR DE CONTRASEÑAS SEGURAS ===\n")
    
    generador = GeneradorContraseñasSeguras()
    
    # Generar una contraseña de ejemplo
    print("1. Generando contraseña segura de 16 caracteres:")
    contraseña = generador.generar_contraseña(16)
    print(f"   Contraseña generada: {contraseña}")
    
    # Evaluar la fortaleza
    evaluacion = generador.evaluar_fortaleza(contraseña)
    print(f"   Nivel de fortaleza: {evaluacion['nivel']} ({evaluacion['puntuacion']:.1f}%)")
    
    # Generar múltiples contraseñas
    print("\n2. Generando 3 contraseñas seguras de 12 caracteres:")
    contraseñas = generador.generar_multiples_contraseñas(3, 12)
    for i, pwd in enumerate(contraseñas, 1):
        print(f"   Contraseña {i}: {pwd}")
    
    # Demostrar evaluación de una contraseña débil
    print("\n3. Evaluando una contraseña débil:")
    contraseña_debil = "password123"
    evaluacion_debil = generador.evaluar_fortaleza(contraseña_debil)
    print(f"   Contraseña: {contraseña_debil}")
    print(f"   Nivel: {evaluacion_debil['nivel']} ({evaluacion_debil['puntuacion']:.1f}%)")
    
    print("\n=== CRITERIOS DE EVALUACIÓN ===")
    print("✓ Longitud suficiente (≥12 caracteres)")
    print("✓ Contiene mayúsculas")
    print("✓ Contiene minúsculas") 
    print("✓ Contiene números")
    print("✓ Contiene caracteres especiales")
    print("✓ Sin secuencias obvias (abc, 123, qwerty, etc.)")
    print("✓ Sin palabras comunes")
    print("✓ Sin repeticiones excesivas de caracteres")


if __name__ == "__main__":
    main()