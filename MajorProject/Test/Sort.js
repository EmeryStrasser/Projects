let arr = [];
let count = 0;

function random() {

    for (let i = 0; i < 20; i++) {
        arr[i] = Math.floor(Math.random() * 100 + 1);

    }

    console.log(arr);

}


function SimpleBubble() {
    let swapcount = 0;
    let swapped = true;
    let a;

    while (swapped == true) {

        swapped = false;
        for (let i = 0; i < arr.length; i++) {

            if (arr[i] > arr[i + 1]) {
                swapcount++;
                a = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = a;
                swapped = true;

            }

        }

    }
    console.log(arr);
    console.log(swapcount);
}

function ComplexBubble() {
    let a;
    swapped = true;
    pass = 0;

    while (swapped == true) {

        swapped = false;
        Comparison = 0;
        while (Comparison < (arr.length - pass)) {

            if (arr[Comparison] < arr[Comparison + 1]) {

                a = arr[Comparison + 1];
                arr[Comparison + 1] = arr[Comparison];
                arr[Comparison] = a;
                swapped = true;

                swapped = true;
            }
            Comparison++;
        }
        pass++;
    }
    console.log(arr);

}

function insertion() {

    let numItems = arr.length;
    let currentItem = 1;

    while (currentItem <= numItems) {
        let currentDataItem = arr[currentItem];
        let comparion = 0;
        let finish = false;

        while (comparion < currentItem & finish === false) {

            if (currentDataItem < arr[comparion]) {

                let shuffleItem = currentItem;
                while (shuffleItem > comparion) {

                    arr[shuffleItem] = arr[shuffleItem - 1];
                    shuffleItem--;

                }

                arr[comparion] = currentDataItem;
                finish = true;

            }
            comparion++;



        }

        currentItem++;

    }

    console.log(arr);

}

function selection() {
    let swapcount = 0;
    let pass = 0;
    while (pass < arr.length) {

        let count = pass + 1;
        let minimun = pass;
        while (count <= arr.length) {

            if (arr[count] < arr[minimun]) {

                minimun = count;


            }

            count++;

        }


        let a = arr[minimun];
        arr[minimun] = arr[pass];
        arr[pass] = a;

        pass++;
        swapcount++;
    }

    console.log(arr);
    console.log(swapcount);
}