var showLoadingImage = require('../../base/utility').showLoadingImage;
var template         = require('../../base/utility').template;
var localize         = require('../../base/localize').localize;
var Client           = require('../../base/client').Client;
var url_for_static   = require('../../base/url').url_for_static;
var url_for          = require('../../base/url').url_for;
var default_redirect_url = require('../../base/url').default_redirect_url;
var Content          = require('../../common_functions/content').Content;

var TNCApproval = (function() {
    'use strict';

    var terms_conditions_version,
        client_tnc_status,
        hiddenClass,
        redirectUrl,
        isReal;


    var init = function() {
        hiddenClass = 'invisible';
        showLoadingImage($('#tnc-loading'));

        redirectUrl = sessionStorage.getItem('tnc_redirect');
        sessionStorage.removeItem('tnc_redirect');

        BinarySocket.send({ get_settings: '1' });
        BinarySocket.send({ website_status: '1' });

        $('#btn-accept').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            BinarySocket.send({ tnc_approval: '1' });
        });
    };

    var showTNC = function() {
        if (!terms_conditions_version || !client_tnc_status || !Client.get_value('landing_company_fullname')) {
            return;
        }

        if (terms_conditions_version === client_tnc_status) {
            redirectBack();
            return;
        }

        $('#tnc-loading').addClass(hiddenClass);
        $('#tnc_image').attr('src', url_for_static('images/pages/cashier/protection-icon.svg'));
        $('#tnc_approval').removeClass(hiddenClass);
        var tnc_message = template($('#tnc-message').html(), [
            Client.get_value('landing_company_fullname'),
            Client.get_value('residence') === 'jp' ?
            url_for('terms-and-conditions-jp') :
            url_for('terms-and-conditions'),
        ]);
        $('#tnc-message').html(tnc_message).removeClass(hiddenClass);
        $('#btn-accept').text(localize('OK'));
    };

    var responseTNCApproval = function(response) {
        if (!response.hasOwnProperty('error')) {
            sessionStorage.setItem('check_tnc', 'checked');
            redirectBack();
        } else {
            $('#err_message').html(response.error.message).removeClass(hiddenClass);
        }
    };

    var redirectBack = function() {
        window.location.href = redirectUrl || default_redirect_url();
    };

    var apiResponse = function(response) {
        isReal = !Client.get_boolean('is_virtual');
        if (!isReal) {
            redirectBack();
        }

        switch (response.msg_type) {
            case 'website_status':
                terms_conditions_version = response.website_status.terms_conditions_version;
                showTNC();
                break;
            case 'get_settings':
                client_tnc_status = response.get_settings.client_tnc_status || '-';
                showTNC();
                break;
            case 'tnc_approval':
                responseTNCApproval(response);
                break;
            default:
                break;
        }
    };

    var onLoad = function() {
        BinarySocket.init({
            onmessage: function(msg) {
                var response = JSON.parse(msg.data);
                if (response) {
                    TNCApproval.apiResponse(response);
                }
            },
        });

        Content.populate();
        TNCApproval.init();
    };

    return {
        init       : init,
        apiResponse: apiResponse,
        showTNC    : showTNC,
        onLoad     : onLoad,
    };
})();

module.exports = {
    TNCApproval: TNCApproval,
};
