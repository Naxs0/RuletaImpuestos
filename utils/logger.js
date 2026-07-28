function info(message) {

    console.log(
        `[${new Date().toLocaleString()}] INFO  ${message}`
    );

}

function warning(message) {

    console.warn(
        `[${new Date().toLocaleString()}] WARN  ${message}`
    );

}

function error(message) {

    console.error(
        `[${new Date().toLocaleString()}] ERROR ${message}`
    );

}

module.exports = {

    info,

    warning,

    error

};