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
}

$('#formSubmit').on('click', formSubmited);

function formSubmited() {
	var description = $('#description').val();
	var quantity = $('#quantity').val();
	if(description && quantity) {
		items.push({
			'description': description,
			'quantity': quantity
		});
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
		row.append('<button>Edit</button>');
		row.append('<button>Delete</button>');
		table.append(row);
	});

}

$('#formCancel').on('click', function () {
	clearInputs();
	event.preventDefault();
});