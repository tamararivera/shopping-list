var items = [];

function toggleSections() {
	$('#itemsTable table').toggleClass('hidden');
	$('#addItem').toggleClass('hidden');
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
	if($('#description').val() && $('#quantity').val()) {
		toggleSections();
		clearInputs();
	}
	event.preventDefault();
}

$('#formCancel').on('click', function () {
	clearInputs();
	event.preventDefault();
});