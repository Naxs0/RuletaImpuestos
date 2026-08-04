/**
 * Fuente reservada para datos de parches de Albion Online.
 *
 * Por ahora permanece desactivada para no introducir datos incompletos ni
 * llamadas externas. Cuando exista un proveedor de parches, canHandle puede
 * evaluar la consulta y getContext devolverá documentos normalizados.
 */
module.exports = {
    name: "PatchTool",
    priority: 90,

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
