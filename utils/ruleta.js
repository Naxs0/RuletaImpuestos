const config = require("../config.json");

function obtenerEmoji(valor) {
    if (valor <= 10) return "🟢";
    if (valor <= 20) return "🟡";
    if (valor <= 30) return "🟠";
    if (valor <= 40) return "🔴";
    return "⚫💀";
}

function construirLista(posicion) {
    return config.impuestos
        .map((valor, index) => {
            const emoji = obtenerEmoji(valor);
            return index === posicion
                ? `▶️ ${emoji} ${valor}%`
                : `   ${emoji} ${valor}%`;
        })
        .join("\n");
}

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generarGiro() {

    const valores = config.impuestos;

    // Elegimos el ganador desde el principio
    const ganador = Math.floor(Math.random() * valores.length);

    // Entre 2 y 4 vueltas completas
    const vueltas = Math.floor(Math.random() * 2) + 3;

    // Pasos totales
    const pasos = vueltas * valores.length + ganador;

    return {
        ganador,
        pasos,
        valores
    };
}

module.exports = {
    obtenerEmoji,
    construirLista,
    esperar,
    generarGiro
};