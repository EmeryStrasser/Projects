let arr = [];
let count = 0;

function random() {

    for (let i = 0; i < 20; i++) {
        arr[i] = Math.floor(Math.random() * 100 + 1);

    }
    console.log(arr);
    bubble();
}


function bubble() {
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