"use strict";
class sortAlgorithms {
  constructor(time) {
    this.list = document.querySelectorAll(".cell");
    this.size = this.list.length;
    this.time = time;
    this.help = new Helper(this.time, this.list);
  }

  // BUBBLE SORT
  BubbleSort = async () => {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";
    document.getElementById("code").innerText = `
    int n = arr.length;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }`;

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText = "O(1)";

    for (let i = 0; i < this.size - 1; ++i) {
      for (let j = 0; j < this.size - i - 1; ++j) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        if (await this.help.compare(j, j + 1)) {
          await this.help.swap(j, j + 1);
        }
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
      }
      this.list[this.size - i - 1].setAttribute("class", "cell done");
    }
    this.list[0].setAttribute("class", "cell done");
  };

  // INSERTION SORT
  InsertionSort = async () => {
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText = "O(1)";

    document.getElementById("code").innerText = `int n = arr.length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }`;

    for (let i = 0; i < this.size - 1; ++i) {
      let j = i;
      while (j >= 0 && (await this.help.compare(j, j + 1))) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        await this.help.pause();
        await this.help.swap(j, j + 1);
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
        j -= 1;
      }
    }
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  // SELECTION SORT
  SelectionSort = async () => {
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N^2)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText = "O(1)";

    document.getElementById("code").innerText = `int n = arr.length;

    for (int i = 0; i < n-1; i++){
        int min_idx = i;
        for (int j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;

        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }`;

    for (let i = 0; i < this.size; ++i) {
      let minIndex = i;
      for (let j = i; j < this.size; ++j) {
        await this.help.markSpl(minIndex);
        await this.help.mark(j);
        if (await this.help.compare(minIndex, j)) {
          await this.help.unmark(minIndex);
          minIndex = j;
        }
        await this.help.unmark(j);
        await this.help.markSpl(minIndex);
      }
      await this.help.mark(minIndex);
      await this.help.mark(i);
      await this.help.pause();
      await this.help.swap(minIndex, i);
      await this.help.unmark(minIndex);
      this.list[i].setAttribute("class", "cell done");
    }
  };

  // MERGE SORT
  MergeSort = async () => {
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText = "O(N)";

    document.getElementById("code").innerText = ` Merging : 

    {
        int n1 = m - l + 1;
        int n2 = r - m;
 
        int L[] = new int[n1];
        int R[] = new int[n2];

        for (int i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];

        int i = 0, j = 0;

        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
 
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }
 
   Sorting : 

    {
        if (l < r) {
            int m =l+ (r-l)/2;

            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }`;

    await this.MergeDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  MergeDivider = async (start, end) => {
    if (start < end) {
      let mid = start + Math.floor((end - start) / 2);
      await this.MergeDivider(start, mid);
      await this.MergeDivider(mid + 1, end);
      await this.Merge(start, mid, end);
    }
  };

  Merge = async (start, mid, end) => {
    let newList = new Array();
    let frontcounter = start;
    let midcounter = mid + 1;

    while (frontcounter <= mid && midcounter <= end) {
      let fvalue = Number(this.list[frontcounter].getAttribute("value"));
      let svalue = Number(this.list[midcounter].getAttribute("value"));
      if (fvalue >= svalue) {
        newList.push(svalue);
        ++midcounter;
      } else {
        newList.push(fvalue);
        ++frontcounter;
      }
    }
    while (frontcounter <= mid) {
      newList.push(Number(this.list[frontcounter].getAttribute("value")));
      ++frontcounter;
    }
    while (midcounter <= end) {
      newList.push(Number(this.list[midcounter].getAttribute("value")));
      ++midcounter;
    }

    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell current");
    }
    for (
      let c = start, point = 0;
      c <= end && point < newList.length;
      ++c, ++point
    ) {
      await this.help.pause();
      this.list[c].setAttribute("value", newList[point]);
      this.list[c].style.height = `${3.5 * newList[point]}px`;
    }
    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell");
    }
  };

  // QUICK SORT
  QuickSort = async () => {
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText = "O(log N)";

    document.getElementById("code").innerText = `Swap : 
    
    { 
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
 
Partition : 

{
    int pivot = arr[high];
    int i = (low - 1);
 
    for(int j = low; j <= high - 1; j++){
        if (arr[j] < pivot){
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

QuickSort : 

{
    if (low < high){
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`;

    await this.QuickDivider(0, this.size - 1);
    for (let c = 0; c < this.size; ++c) {
      this.list[c].setAttribute("class", "cell done");
    }
  };

  QuickDivider = async (start, end) => {
    if (start < end) {
      let pivot = await this.Partition(start, end);
      await this.QuickDivider(start, pivot - 1);
      await this.QuickDivider(pivot + 1, end);
    }
  };

  Partition = async (start, end) => {
    let pivot = this.list[end].getAttribute("value");
    let prev_index = start - 1;

    await this.help.markSpl(end);
    for (let c = start; c < end; ++c) {
      let currValue = Number(this.list[c].getAttribute("value"));
      await this.help.mark(c);
      if (currValue < pivot) {
        prev_index += 1;
        await this.help.mark(prev_index);
        await this.help.swap(c, prev_index);
        await this.help.unmark(prev_index);
      }
      await this.help.unmark(c);
    }
    await this.help.swap(prev_index + 1, end);
    await this.help.unmark(end);
    return prev_index + 1;
  };
}
