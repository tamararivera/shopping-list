var items = [];

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
}

$('#formSubmit').on('click', formSubmited);

function formSubmited() {
	var description = $('#description').val();
	var quantity = $('#quantity').val();
	var index = $('#index').val();
	if(description && quantity) {
		if($.isNumeric(index)) {
			items[index].description = description;
			items[index].quantity = quantity;
		}
		else {
			items.push({
				'description': description,
				'quantity': quantity
			});

		}
		populateTable();
		toggleSections();
		clearInputs();
	}
	event.preventDefault();
}

function populateTable() {
	var table = $('#itemsTable table tbody');
	table.html('');
	items.forEach(function (item, index) {
		var row = $('<tr><td>'+ item.description +'</td><td>' + item.quantity + '</td></tr>');
		row.append('<button class="edit">Edit</button>');
		row.append('<button class="delete">Delete</button>');
		table.append(row);
		editButtonBinding(item, index);
	});

}

function editButtonBinding(item, index) {
	$('button.edit').on('click', function() {
			toggleSections();
			$('#description').val(item.description);
			$('#quantity').val(item.quantity);
			$('#index').val(index);
	});
}

$('#formCancel').on('click', function () {
	toggleSections();
	clearInputs();
	event.preventDefault();
});