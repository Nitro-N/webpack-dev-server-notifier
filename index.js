require('notie/dist/notie.css');

const socket = require("webpack-dev-server/client/socket");
const notie = require('notie');


let hot = false;

const onSocketMsg = {
    hot: function () {
        hot = true;
    },
    invalid: function () {
        notie.alert({
            type: 'info',
            text: 'App updated. Recompiling...'
        });
    },
    hash: function (hash) {
    },
    "still-ok": function () {
        notie.alert({
            type: 'success',
            text: 'App ready.',
            time: 1
        });
    },
    ok: function () {
        notie.alert({
            type: 'success',
            text: 'App ready.',
            time: 1
        });
    },
    warnings: function () {
        notie.alert({
            type: 'warning',
            text: 'Warnings while compiling.',
            stay: true
        });

    },
    errors: function (errors) {
        const errString = errors
            .join("<br><br><br>")
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;');

        notie.alert({
            type: 'error',
            text: `App updated with errors. No reload! Errors while compiling.<br>
            <small>${errString}</small>`,
            stay: true
        });

    },
    close: function () {
        notie.alert({
            type: 'error',
            text: 'Could not proxy to content base target!'
        });
    }
};

socket("/sockjs-node", onSocketMsg);
