var items = [];

if(localStorage["ShoppingList_Items"]) {
	$('#itemsTable table').removeClass('hidden');
	items = JSON.parse(localStorage["ShoppingList_Items"]);
	populateTable();
}

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

$('#formSubmit').one('click', function () {
	$('#itemsTable table').removeClass('hidden');
});

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
		storeItems();
	}
	event.preventDefault();
}

function storeItems() {
	localStorage["ShoppingList_Items"] = JSON.stringify(items);
};

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
		storeItems();
	});
}

$('#formCancel').on('click', function () {
	toggleSections();
	clearInputs();
	event.preventDefault();
});