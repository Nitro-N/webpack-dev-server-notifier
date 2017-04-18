require('notie/dist/notie.css');

const socket = require("webpack-dev-server/client/socket");
const notie = require('notie');


let hot = false;

const onSocketMsg = {
    hot: function () {
        hot = true;
    },
    invalid: function () {
        notie.alert('info', 'App updated. Recompiling...');
    },
    hash: function (hash) {
    },
    "still-ok": function () {
        notie.alert('success', 'App ready.', 1);
    },
    ok: function () {
        notie.alert('success', 'App ready.', 1);
    },
    warnings: function () {
        notie.alert('warning', 'Warnings while compiling.');

    },
    errors: function (errors) {
        const errString = errors
            .join("<br><br><br>")
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;');

        notie.alert('error',
            `App updated with errors. No reload! Errors while compiling.<br>
       <small>${errString}</small>`);

    },
    close: function () {
        notie.alert('error', 'Could not proxy to content base target!');
    }
};

socket("/sockjs-node", onSocketMsg);
