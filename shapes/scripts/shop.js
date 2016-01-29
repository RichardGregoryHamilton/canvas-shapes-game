/* This JavaScript file is devoted to the logic behind the shop */

var purchases = JSON.parse(localStorage['shapePurchases']);
var cart = [];

var patterns = [
                 { 'name': 'Pattern 1', 'price': 10 },
                 { 'name': 'Pattern 2', 'price': 10 },
                 { 'name': 'Pattern 3', 'price': 15 },
                 { 'name': 'Pattern 4', 'price': 15 },
                 { 'name': 'Pattern 5', 'price': 20 },
                 { 'name': 'Pattern 6', 'price': 20 },
                 { 'name': 'Pattern 7', 'price': 20 }
               ];

for (var i = 0; i < patterns.length; i++) {
    $('#shop-table tbody').append('<tr></tr>');
}

$('#shop-table tbody tr').each(function(index) {
    $(this).append("<td class='item'>" + patterns[index].name + "</td>");
    $(this).append('<td>Image Placeholder</td>');
    if (purchases.indexOf(patterns[index].name) == -1) {
        $(this).append("<td><span class='coins-badge'>" + patterns[index].price + "</span></td>");
    }
    else {
        $(this).append('<td>Purchased</td>');
    }
});

function approvePurchase() {
    $('#purchase-notification').html('Your purchase has been confirmed');
    $('#purchase-notification').css({ 'visibility': 'visible' });
    setTimeout(function() {
        $('#purchase-notification').css({ 'visibility': 'hidden' });
    }, 5000);
}

function rejectPurchase() {
    $('#purchase-notification').html("You don't have enough coins to make this purchase");
    $('#purchase-notification').css({ 'visibility': 'visible', 'background': 'red' });
    setTimeout(function() {
        $('#purchase-notification').css({ 'visibility': 'hidden', 'background': 'green' });
    }, 5000);
}

$(".coins-badge").on("click", function() {
    var coins = Number(localStorage['shapesCoins']);
    var price = Number($(this).html());
    var badge = $(this);

    if (coins > price) {
        var item = badge.closest('tr').find('.item').html();
        badge.parent().html('Purchased');
        localStorage['shapesCoins'] = coins - price;
        $('#my-header .coins-badge').html(coins - price);
        approvePurchase();
        if (purchases.length) {
            cart.push(item);
            localStorage['shapePurchases'] = JSON.stringify(purchases.concat(cart));
        }
        else {
            if (cart.indexOf(item) == -1) {
                cart.push(item);
                localStorage['shapePurchases'] = JSON.stringify(cart);
            }
        }
    }
    else {
        rejectPurchase();
    }

});
