jQuery(document).ready(function(){
	
	const _path = window.location.pathname;

    // Replace hyphens with spaces
    let _route = _path.replace(/-/g, ' ');

    // Remove leading and trailing slashes
    _route = _route.replace(/^\/|\/$/g, '');

	const _inputElement = document.getElementsByName('whatsapp-extra-info')[0];
	if (_inputElement) {
        // Change the value of the input element
        _inputElement.value = _route;
    }
	
	const wppButton = document.getElementById('wpp-link');
		const wppForm = document.getElementById('wpp-form');
		const closeButton = document.getElementById('close-bt');
		const phone = document.getElementById('telefone');
		const mask = document.querySelector('#wpp-fix .mask');
		const response = document.querySelector('#wpp-form .response-output');
	
		function getData(form) {
		  var formData = new FormData(form);
		  return Object.fromEntries(formData);
		}
	
		wppButton.addEventListener('click', function(){ 
			wppButton.classList.add('hide-this');
		});
	
		mask.onclick = () => {
			wppButton.classList.remove('hide-this');
		};
	
		closeButton.onclick = () => {
			wppButton.classList.remove('hide-this');
		};
	});

document.addEventListener("DOMContentLoaded", function () {
        const _urlParams = new URLSearchParams(window.location.search);
        Array.from(_urlParams).forEach(([key, value]) => {
            value = capitalizeWords(value);
            let input = document.querySelector(`.wpcf7-form-control[name="${key}"]`);
            if (input) {
                input.value = value;
            }
        });
        function capitalizeWords(str) {
            return str.replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
        }
    });
		
	