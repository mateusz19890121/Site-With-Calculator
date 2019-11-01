document.addEventListener('DOMContentLoaded', function () {
    const productIndicator = 0.5;
    const orderIndicator = 0.25;
    const doc = document;
    const packages = {
        'basic': 20,
        'professional': 40,
        'premium': 60
    };
    const accountingPrice = 35;
    const terminalPrice = 5;
    const prices = {
        products: 0,
        orders: 0,
        package: 0,
        accounting: 0,
        terminal: 0
    };
    let total = 0;

    doc.getElementById('accountingPrice').innerText = `$${accountingPrice}`;
    doc.getElementById('terminalPrice').innerText = `$${terminalPrice}`;
    doc.getElementById('total').innerText = `$${total}`;

    doc.querySelector('#numOfProducts').addEventListener('input', (event) => {
        showOrderComponentAfterAddValInInput(
            productIndicator,
            event.path[0].value,
            doc.getElementById('sumOfProductsBox'),
            doc.getElementById('currentNumOfProducts'),
            doc.getElementById('sumOfProducts'));

        updateTotal('products', +event.path[0].value * productIndicator);
    });

    doc.querySelector('#numOfOrders').addEventListener('input', (event) => {
        showOrderComponentAfterAddValInInput(
            orderIndicator,
            event.path[0].value,
            doc.getElementById('sumOfOrdersBox'),
            doc.getElementById('currentNumOfOrders'),
            doc.getElementById('sumOfOrders'));

        updateTotal('orders', +event.path[0].value * orderIndicator);
    });

    doc.querySelector('#optionsOfPackages').addEventListener('change', (event) => {
        const currentVal = event.path[0].value;
        let currentPackage;
        function getCurrentPackage(currentVal) {
            if (+currentVal === 1) {
                currentPackage =  'basic';
            }
            if (+currentVal === 2) {
                currentPackage =  'professional';
            }

            if (+currentVal === 3) {
                currentPackage = 'premium';
            }
        };
        getCurrentPackage(currentVal);

        showOrderComponentAfterAddValInInput(
            0,
            currentPackage,
            doc.getElementById('package'),
            doc.getElementById('selectedPackage'),
            doc.getElementById('priceOfPackage'));

        updateTotal('package', packages[currentPackage]);
    });

    doc.getElementById('accountingInput').addEventListener('change', () => {
        showHideOrderComponentAfterChangeCheckbox(
            accountingPrice,
            doc.getElementById('accountingInput'),
            doc.getElementById('accounting'),
            'accounting'
        )
    });

    doc.getElementById('terminalInput').addEventListener('input', () => {
        showHideOrderComponentAfterChangeCheckbox(
            terminalPrice,
            doc.getElementById('terminalInput'),
            doc.getElementById('terminal'),
            'terminal'
        )
    });

    function showHideOrderComponentAfterChangeCheckbox (val, checkbox, elemToDisplay, property) {
        if(checkbox.checked) {
            elemToDisplay.style.visibility = 'visible';
            updateTotal(property, val);
        } else {
            elemToDisplay.style.visibility = 'hidden';
            updateTotal(property, 0);
        }
    }

    function showOrderComponentAfterAddValInInput (indicator , value, elmToShow, elmToDisplayCount, elmToDisplaySum){
        elmToShow.style.visibility = 'visible';
        elmToDisplayCount.innerText = indicator ? `${value} * $${indicator}` : `${value}`;
        elmToDisplaySum.innerText = indicator ? `$${indicator * +value}` : `$${packages[value]}`;
    }

    function updateTotal(key, val) {
        prices[key] = +val;
        total = 0;
        for (let item in prices) {
            total = total + prices[item];
        }
        doc.getElementById('total').innerText = `$${total}`;
    }
});