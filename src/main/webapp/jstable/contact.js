/**
 * Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/* exported initSample */

if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
    CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';

var showContactLayout = (function () {
    var wysiwygareaAvailable = isWysiwygareaAvailable(),
            isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

    return function () {
        var editorElement = CKEDITOR.document.getById('contactInfo');

        // :(((
        if (isBBCodeBuiltIn) {
            /*editorElement.setHtml(
             'Hello world!\n\n' +
             'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
             );*/
        }

        // Depending on the wysiwygare plugin availability initialize classic or inline editor.
        if (wysiwygareaAvailable) {
            CKEDITOR.replace('contactInfo');
        } else {
            editorElement.setAttribute('contenteditable', 'true');
            CKEDITOR.inline('contactInfo');

            // TODO we can consider displaying some info box that
            // without wysiwygarea the classic editor may not work.
        }
        $.ajax({
            type: "GET",
            url: "./rest/getContact/",
            data: '',
            cache: false,
            dataType: "json",
            success: function (data) {
                if (data.error_code == 0) {
                    if (data.contact != null && data.contact.content != null) {
                        CKEDITOR.instances['contactInfo'].setData(data.contact.content);
                    }
                } else {
                    notify('danger', '<strong>Error</strong>!!!' + data.error_message);
                }
                $("#btnUpdateContact").prop('disabled', false);
            }
        });
    };

    function isWysiwygareaAvailable() {
        // If in development mode, then the wysiwygarea must be available.
        // Split REV into two strings so builder does not replace it :D.
        if (CKEDITOR.revision == ('%RE' + 'V%')) {
            return true;
        }

        return !!CKEDITOR.plugins.get('wysiwygarea');
    }
})();

checkFormContact = function ()
{
    $(document).ready(function () {

        var dataString = CKEDITOR.instances.contactInfo.getData();
        $("#btnUpdateContact").prop('disabled', true);
        $.ajax({
            type: "POST",
            url: "./rest/updateContact/",
            data: {contactInfo: dataString},
            cache: false,
            dataType: "json",
            beforeSend: function () {
                //$("#btnUpdateContact").val('Đang lưu...');
            },
            success: function (data) {
                if (data.error_code == 0) {
                    notify('success', '<strong>Success</strong> Cập nhật dữ liệu thành công !!!');
                } else {
                    notify('danger', '<strong>Error</strong> Cập nhật dữ liệu KHÔNG thành công !!!');
                }
                $("#btnUpdateContact").prop('disabled', false);
            }
        });
    });
}
function notify(type, message) {
    $.notify({
// options
        message: message
    }, {
// settings
        type: type,
        delay: 1000,
        timer: 1000,
        z_index: 9999
    });
}
