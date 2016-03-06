var ui;
(function (ui) {
    var preloadedHtml = {};
    function init() {
        ui.preloadHtml('loading');
    }
    ui.init = init;
    function preloadHtml(fileName) {
        if (!(fileName in preloadedHtml)) {
            $.ajax({
                url: 'html/' + fileName + '.html',
                async: false,
                success: function (data) {
                    preloadedHtml[fileName] = data;
                }
            });
        }
        return preloadedHtml[fileName];
    }
    ui.preloadHtml = preloadHtml;
    function setLoading(id) {
        if (id === void 0) { id = "content"; }
        $('#' + id).html(ui.preloadHtml('loading'));
    }
    ui.setLoading = setLoading;
    function showStatusMessage(message) {
        if (Global.stateObject) {
            Global.stateObject.onStatusMessage(message);
        }
    }
    ui.showStatusMessage = showStatusMessage;
    function showErrorMessage(message) {
        if (Global.stateObject) {
            Global.stateObject.onErrorMessage(message);
        }
    }
    ui.showErrorMessage = showErrorMessage;
    function formatString(text, data) {
        var template = Handlebars.compile(text);
        return template(data);
    }
    ui.formatString = formatString;
    function formatFile(filename, data) {
        var templateCode = ui.preloadHtml(filename);
        return ui.formatString(templateCode, data);
    }
    ui.formatFile = formatFile;
    function buttonList(parent, idPrefix, clickCallback) {
        parent.find("button[id*='" + idPrefix + "']").button().click(function (clickEvent) {
            var item_id = $(clickEvent.target).prop('id');
            var regex = new RegExp(idPrefix + '_([0-9a-fA-F]+)');
            var id = regex.exec(item_id)[1];
            clickCallback(id);
        });
    }
    ui.buttonList = buttonList;
})(ui || (ui = {}));
//# sourceMappingURL=module.ui.js.map