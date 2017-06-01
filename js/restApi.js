var items = [];
var url = 'https://pacific-meadow-64112.herokuapp.com/data-api/trivera';

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
			item._id = id;
			updateElement(item, index);
		}
		else {
			addElement(item);

		}
		toggleSections();
		clearInputs();
	}
	event.preventDefault();
}

$('#formCancel').on('click', function () {
	toggleSections();
	clearInputs();
	event.preventDefault();
});

function updateElement(item, index) {

	items[index].description = item.description;
	items[index].quantity = item.quantity;
	items[index]._id = item._id;


	$.ajax( url + '/' + item._id,
    {
        method: 'PUT',
        data: {
        	description: item.description,
        	quantity: item.quantity
        },
        success: function (response) {
        	populateTable();
        },
        error: reportAjaxError
    } );
			
}

function addElement(item) {
	items.push(item);
	$.ajax( url,
    {
        method: 'POST',
        data: item,
        success: function (response) {
        	item._id = response.created;
    		populateTable();
        },
        error: reportAjaxError
    } );
}

function deleteElement(index, id){
	items.splice(index, 1);
	$.ajax( url+ '/' + id,
    {
        method: 'DELETE',
        success: function (response) {
        	populateTable();
        },
        error: reportAjaxError
    } );
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
    console.log(msg);
}

function populateTable() {
	var table = $('#itemsTable table tbody');
	table.html('');
	items.forEach(function (item, index) {
		var row = $('<tr><td>'+ item.description +'</td><td>' + item.quantity + '</td></tr>');
		row.append('<td><button class="edit">Edit</button><button class="delete">Delete</button></td>');
		table.append(row);
		editButtonBinding(item, index, row);
		deleteButtonBinding(index, item._id, row);
	});

}

function editButtonBinding(item, index, row) {
	row.find('button.edit').on('click', function() {
			toggleSections();
			$('#description').val(item.description);
			$('#quantity').val(item.quantity);
			$('#index').val(index);
			$('#uniqueId').val(item._id);
	});
}

function deleteButtonBinding(index, id, row) {
	row.find('button.delete').on('click', function() {
		deleteElement(index, id);
	});
}