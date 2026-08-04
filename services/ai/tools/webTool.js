/**
 * Fuente reservada para consultas web permitidas de Albion Online.
 *
 * Se mantiene desactivada hasta definir las fuentes oficiales permitidas,
 * límites de uso y la normalización de resultados.
 */
module.exports = {
    name: "WebTool",
    priority: 80,

    async canHandle() {
        return false;
    },

    async search() {
        return [];
    },

    async getContext() {
        return "";
    }
};
