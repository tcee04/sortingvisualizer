document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('arrayContainer');
    const generateArrayBtn = document.getElementById('generateArray');
    const startSortBtn = document.getElementById('startSort');
    const algorithmSelect = document.getElementById('algorithm');
    const comparisonCountDisplay = document.getElementById('comparisonCount');
    let array = [];
    let comparisonCount = 0;

    generateArrayBtn.addEventListener('click', generateArray);
    startSortBtn.addEventListener('click', startSorting);

    function generateArray() {
        arrayContainer.innerHTML = '';
        array = [];
        comparisonCount = 0;
        comparisonCountDisplay.textContent = `Comparisons: ${comparisonCount}`;
        
        for (let i = 0; i < 50; i++) {
            const value = Math.floor(Math.random() * 400) + 10;
            array.push(value);
            const arrayBar = document.createElement('div');
            arrayBar.classList.add('array-bar');
            arrayBar.style.height = `${value}px`;
            arrayContainer.appendChild(arrayBar);
        }
    }

    async function startSorting() {
        comparisonCount = 0;
        comparisonCountDisplay.textContent = `Comparisons: ${comparisonCount}`;
        switch (algorithmSelect.value) {
            case 'bubbleSort':
                await bubbleSort(array);
                break;
            case 'selectionSort':
                await selectionSort(array);
                break;
            case 'insertionSort':
                await insertionSort(array);
                break;
            case 'mergeSort':
                await mergeSort(array, 0, array.length - 1);
                break;
            case 'quickSort':
                await quickSort(array, 0, array.length - 1);
                break;
            case 'heapSort':
                await heapSort(array);
                break;
        }
        comparisonCountDisplay.textContent = `Comparisons: ${comparisonCount}`;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function updateArrayVisual(array) {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < array.length; i++) {
            arrayBars[i].style.height = `${array[i]}px`;
        }
    }

    async function bubbleSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n-1; i++) {
            for (let j = 0; j < n-i-1; j++) {
                comparisonCount++;
                if (arr[j] > arr[j+1]) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    updateArrayVisual(arr);
                    await sleep(50);
                }
            }
        }
    }

    async function selectionSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n-1; i++) {
            let minIdx = i;
            for (let j = i+1; j < n; j++) {
                comparisonCount++;
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                updateArrayVisual(arr);
                await sleep(50);
            }
        }
    }

    async function insertionSort(arr) {
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                comparisonCount++;
                arr[j + 1] = arr[j];
                j = j - 1;
                updateArrayVisual(arr);
                await sleep(50);
            }
            arr[j + 1] = key;
            updateArrayVisual(arr);
            await sleep(50);
        }
    }

    async function mergeSort(arr, l, r) {
        if (l >= r) {
            return;
        }
        const m = l + Math.floor((r - l) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }

    async function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = new Array(n1);
        let R = new Array(n2);
        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            comparisonCount++;
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
            updateArrayVisual(arr);
            await sleep(50);
        }
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            updateArrayVisual(arr);
            await sleep(50);
        }
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            updateArrayVisual(arr);
            await sleep(50);
        }
    }

    async function quickSort(arr, low, high) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    }

    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = (low - 1);
        for (let j = low; j <= high - 1; j++) {
            comparisonCount++;
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                updateArrayVisual(arr);
                await sleep(50);
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        updateArrayVisual(arr);
        await sleep(50);
        return (i + 1);
    }

    async function heapSort(arr) {
        let n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            updateArrayVisual(arr);
            await sleep(50);
            await heapify(arr, i, 0);
        }
    }

    async function heapify(arr, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < n) {
            comparisonCount++;
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }
        if (right < n) {
            comparisonCount++;
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }
        if (largest != i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            updateArrayVisual(arr);
            await sleep(50);
            await heapify(arr, n, largest);
        }
    }
});
