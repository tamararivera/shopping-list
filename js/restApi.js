var items = [];
var url = 'https://pacific-meadow-64112.herokuapp.com/data-api/trivera';

/*if(localStorage["ShoppingList_Items"]) {
	$('#itemsTable table').removeClass('hidden');
	items = JSON.parse(localStorage["ShoppingList_Items"]);
	populateTable();
}*/

$.ajax( url,
    {
        method: 'GET',
        success: function getItems(data) {
        	$('#itemsTable table').removeClass('hidden');
        	items = data;
        	populateTable();
        },
        error: reportAjaxError
    } );

function toggleSections() {
	$('#itemsTable').toggleClass('hidden');
	$('#addForm').toggleClass('hidden');
}

$('#addItem').on('click', addItem);

function addItem() {
	toggleSections();
}

function clearInputs() {
	$('#description').val('');
	$('#quantity').val('');
	$('#index').val('');
	$('#uniqueId').val('');
}

$('#formSubmit').one('click', function () {
	$('#itemsTable table').removeClass('hidden');
});

$('#formSubmit').on('click', formSubmited);

function formSubmited() {
	var description = $('#description').val();
	var quantity = $('#quantity').val();
	var index = $('#index').val();
	var id = $('#uniqueId').val();

	var item = {
		'description': description,
		'quantity': quantity
	}
	if(description && quantity) {
		if($.isNumeric(index)) {
			item.id = id;
			updateElement(item);
		}
		else {
			addElement(item);

		}
		toggleSections();
		clearInputs();
	}
	event.preventDefault();
}

function updateElement(item, index) {
	items[index].description = item.description;
	items[index].quantity = item.quantity;
	items[index].id = item.id;

	$.ajax( url + '/' + item.id,
    {
        method: 'PUT',
        data: item,
        success: aSuccess,
        error: reportAjaxError
    } );
			
}

function addElement(item) {
	items.push(item);
	$.ajax( url,
    {
        method: 'POST',
        data: item,
        success: aSuccess,
        error: reportAjaxError
    } );
}

function aSuccess( response ) {
    populateTable();
}

function reportAjaxError( jqXHR, textStatus, errorThrown ) {
    var msg = 'AJAX error.\n' +
        'Status Code: ' + jqXHR.status + '\n' +
        'Status: ' + textStatus;
    if ( errorThrown ) {
        msg += '\n' + 'Error thrown: ' + errorThrown;
    }
    if ( jqXHR.responseText ) {
        msg += '\n' + 'Response text: ' + jqXHR.responseText;
    }
    $('#response').text( msg );
}

function populateTable() {
	var table = $('#itemsTable table tbody');
	table.html('');
	items.forEach(function (item, index) {
		var row = $('<tr><td>'+ item.description +'</td><td>' + item.quantity + '</td></tr>');
		row.append('<td><button class="edit">Edit</button><button class="delete">Delete</button></td>');
		table.append(row);
		editButtonBinding(item, index, row);
		deleteButtonBinding(index, row);
	});

}

function editButtonBinding(item, index, row) {
	row.find('button.edit').on('click', function() {
			toggleSections();
			$('#description').val(item.description);
			$('#quantity').val(item.quantity);
			$('#index').val(index);
	});
}

function deleteButtonBinding(index, row) {
	row.find('button.delete').on('click', function() {
		items.splice(index, 1);
		populateTable();
		//storeItems();
	});
}

$('#formCancel').on('click', function () {
	toggleSections();
	clearInputs();
	event.preventDefault();
});