/* Direct official resources checked 2026-10-27 through public pages/search listings.
   References and platform variants are explicitly labelled. External judges require
   their own accounts where applicable; opening a link never records completion. */
(function(root){
const resources = [
  {
    "id": 1,
    "url": "https://www.geeksforgeeks.org/problems/odd-or-even3618/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 2,
    "url": "https://www.geeksforgeeks.org/problems/greatest-of-three-numbers2520/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 3,
    "url": "https://www.geeksforgeeks.org/problems/leap-year0943/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 4,
    "url": "https://www.geeksforgeeks.org/problems/sum-of-n-number--144226/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 5,
    "url": "https://www.geeksforgeeks.org/problems/count-total-digits-in-a-number/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 6,
    "url": "https://www.geeksforgeeks.org/problems/sum-of-digits1742/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 7,
    "url": "https://www.geeksforgeeks.org/problems/reverse-digit0316/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 8,
    "url": "https://leetcode.com/problems/palindrome-number/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 9,
    "url": "https://www.geeksforgeeks.org/problems/factorial5739/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 10,
    "url": "https://www.geeksforgeeks.org/problems/fibonacci-series-up-to-nth-term/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Platform variant: return the series through term N (zero-based), modulo 1,000,000,007; N is a term index, not a maximum value."
  },
  {
    "id": 11,
    "url": "https://www.geeksforgeeks.org/problems/prime-number2314/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 12,
    "url": "https://www.geeksforgeeks.org/problems/find-prime-numbers-in-a-range4718/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 13,
    "url": "https://www.geeksforgeeks.org/problems/lcm-and-gcd4516/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 14,
    "url": "https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "The platform exercise restricts input to three-digit numbers. For a general N-digit number, use digit powers of N."
  },
  {
    "id": 15,
    "url": "https://www.geeksforgeeks.org/problems/perfect-numbers3207/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 16,
    "url": "https://www.geeksforgeeks.org/problems/strong-numbers4336/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 17,
    "url": "https://www.geeksforgeeks.org/dsa/harshad-or-niven-number/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 18,
    "url": "https://www.geeksforgeeks.org/problems/power-using-recursion/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "This platform exercise asks for the recursive version of n raised to p. Avoid built-in power functions."
  },
  {
    "id": 19,
    "url": "https://www.geeksforgeeks.org/problems/decimal-to-binary-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 20,
    "url": "https://www.geeksforgeeks.org/problems/binary-number-to-decimal-number3525/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 21,
    "url": "https://leetcode.com/problems/count-primes/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "LeetCode counts primes strictly below N. For an inclusive upper limit, adapt the boundary accordingly."
  },
  {
    "id": 22,
    "url": "https://www.geeksforgeeks.org/dsa/program-to-print-right-half-pyramid-pattern-star-pattern/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 23,
    "url": "https://www.geeksforgeeks.org/dsa/program-to-print-inverted-right-half-pyramid-pattern-star-pattern/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 24,
    "url": "https://www.geeksforgeeks.org/dsa/program-to-print-full-pyramid-pattern-star-pattern/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 25,
    "url": "https://www.geeksforgeeks.org/problems/floyds-triangle1222/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 26,
    "url": "https://www.geeksforgeeks.org/dsa/program-print-diamond-shape/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 27,
    "url": "https://leetcode.com/problems/pascals-triangle/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 28,
    "url": "https://www.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 29,
    "url": "https://www.geeksforgeeks.org/problems/second-largest3735/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 30,
    "url": "https://www.geeksforgeeks.org/dsa/menu-driven-program-in-cpp-to-perform-various-basic-operations-on-array/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Use the sum and average section of this array-operations reference."
  },
  {
    "id": 31,
    "url": "https://www.geeksforgeeks.org/problems/reverse-an-array/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 32,
    "url": "https://www.geeksforgeeks.org/problems/count-odd-even/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 33,
    "url": "https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 34,
    "url": "https://www.geeksforgeeks.org/problems/search-an-element-in-an-array-1587115621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 35,
    "url": "https://www.geeksforgeeks.org/dsa/counting-frequencies-of-array-elements/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 36,
    "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 37,
    "url": "https://www.geeksforgeeks.org/dsa/array-rotation/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Start with the left-rotation-by-one helper and use D = 1. The article also extends it to D rotations."
  },
  {
    "id": 38,
    "url": "https://www.geeksforgeeks.org/problems/rotate-array-by-n-elements-1587115621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "This exercise rotates left by D positions."
  },
  {
    "id": 39,
    "url": "https://leetcode.com/problems/move-zeroes/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 40,
    "url": "https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 41,
    "url": "https://www.geeksforgeeks.org/dsa/find-duplicates-in-an-array-with-values-1-to-n-using-counting-sort/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "The reference covers returning a duplicate via a frequency map; follow the stated input constraints for other approaches."
  },
  {
    "id": 42,
    "url": "https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 43,
    "url": "https://leetcode.com/problems/sort-colors/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 44,
    "url": "https://www.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 45,
    "url": "https://www.geeksforgeeks.org/problems/intersection-of-two-sorted-array-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 46,
    "url": "https://leetcode.com/problems/merge-sorted-array/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "LeetCode stores the merged result in the first array, which has extra capacity."
  },
  {
    "id": 47,
    "url": "https://www.geeksforgeeks.org/problems/key-pair5616/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "The platform asks whether a pair exists; also practice returning the pair itself."
  },
  {
    "id": 48,
    "url": "https://www.geeksforgeeks.org/dsa/return-a-pair-with-maximum-product-in-array-of-integers/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Also read the negative-values section: compare the two largest and the two smallest values."
  },
  {
    "id": 49,
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 50,
    "url": "https://www.geeksforgeeks.org/problems/equilibrium-point-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 51,
    "url": "https://www.geeksforgeeks.org/problems/majority-element-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 52,
    "url": "https://leetcode.com/problems/range-sum-query-immutable/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 53,
    "url": "https://leetcode.com/problems/reverse-string/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "Reverse the supplied character array in place."
  },
  {
    "id": 54,
    "url": "https://www.geeksforgeeks.org/problems/palindrome-string0817/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 55,
    "url": "https://www.geeksforgeeks.org/java/java-program-to-count-the-total-number-of-vowels-and-consonants-in-a-string/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Reference exercise counting vowels and consonants; implement it in your chosen language."
  },
  {
    "id": 56,
    "url": "https://www.geeksforgeeks.org/problems/toggle-case/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 57,
    "url": "https://www.geeksforgeeks.org/problems/remove-spaces0128/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 58,
    "url": "https://www.geeksforgeeks.org/problems/count-number-of-words1500/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Words are separated by spaces, tabs or newlines."
  },
  {
    "id": 59,
    "url": "https://www.geeksforgeeks.org/cpp/frequency-of-each-character-in-a-string-using-unordered_map-in-c/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Character-frequency reference exercise; use your preferred language."
  },
  {
    "id": 60,
    "url": "https://www.geeksforgeeks.org/problems/remove-vowels-from-string1446/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 61,
    "url": "https://www.geeksforgeeks.org/problems/upper-case-conversion5419/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 62,
    "url": "https://www.geeksforgeeks.org/dsa/rearrange-a-string-in-sorted-order-followed-by-the-integer-sum/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Related reference: its digit-sum step matches this task; the full article additionally sorts uppercase letters. For Respawn, return only the sum of individual digits."
  },
  {
    "id": 63,
    "url": "https://www.geeksforgeeks.org/problems/remove-all-duplicates-from-a-given-string4321/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Keep first appearances in original order; uppercase and lowercase are distinct."
  },
  {
    "id": 64,
    "url": "https://leetcode.com/problems/first-unique-character-in-a-string/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "Return the first non-repeating character's index, or -1."
  },
  {
    "id": 65,
    "url": "https://leetcode.com/problems/valid-anagram/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 66,
    "url": "https://leetcode.com/problems/check-if-the-sentence-is-pangram/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 67,
    "url": "https://leetcode.com/problems/reverse-words-in-a-string/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "Reverse word order and normalize separating spaces."
  },
  {
    "id": 68,
    "url": "https://www.geeksforgeeks.org/python/python-program-to-find-the-longest-word-in-a-sentence/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 69,
    "url": "https://leetcode.com/problems/rotate-string/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 70,
    "url": "https://www.geeksforgeeks.org/problems/run-length-encoding/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Run-length encoding includes count 1 for singleton runs."
  },
  {
    "id": 71,
    "url": "https://leetcode.com/problems/longest-common-prefix/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 72,
    "url": "https://leetcode.com/problems/binary-search/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "The platform uses a sorted array of unique values."
  },
  {
    "id": 73,
    "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 74,
    "url": "https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 75,
    "url": "https://leetcode.com/problems/search-insert-position/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 76,
    "url": "https://www.geeksforgeeks.org/problems/bubble-sort/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 77,
    "url": "https://www.geeksforgeeks.org/problems/selection-sort/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 78,
    "url": "https://www.geeksforgeeks.org/problems/insertion-sort/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 79,
    "url": "https://www.geeksforgeeks.org/problems/merge-sort/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 80,
    "url": "https://www.geeksforgeeks.org/problems/quick-sort/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 81,
    "url": "https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 82,
    "url": "https://www.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency-1587115621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Sort by decreasing frequency; ties use increasing element value."
  },
  {
    "id": 83,
    "url": "https://leetcode.com/problems/sqrtx/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 84,
    "url": "https://www.geeksforgeeks.org/problems/addition-of-two-square-matrices4916/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "This practice version uses two square matrices of the same size."
  },
  {
    "id": 85,
    "url": "https://www.geeksforgeeks.org/problems/multiply-2-matrices4144/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 86,
    "url": "https://leetcode.com/problems/transpose-matrix/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 87,
    "url": "https://www.geeksforgeeks.org/dsa/program-to-find-the-sum-of-each-row-and-each-column-of-a-matrix/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 88,
    "url": "https://www.geeksforgeeks.org/problems/diagonal-sum0158/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Return the sum of both diagonals; this platform counts an odd-sized matrix's centre twice."
  },
  {
    "id": 89,
    "url": "https://www.geeksforgeeks.org/dsa/program-to-check-if-a-matrix-is-symmetric/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 90,
    "url": "https://leetcode.com/problems/spiral-matrix/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 91,
    "url": "https://leetcode.com/problems/rotate-image/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "Rotate a square matrix 90 degrees clockwise in place."
  },
  {
    "id": 92,
    "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 93,
    "url": "https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops3621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 94,
    "url": "https://www.geeksforgeeks.org/cpp/cpp-program-to-find-factorial-using-recursion/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Use recursion for this revisit of factorial."
  },
  {
    "id": 95,
    "url": "https://leetcode.com/problems/fibonacci-number/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "Solve using recursion for this task; the platform also accepts other approaches."
  },
  {
    "id": 96,
    "url": "https://www.geeksforgeeks.org/dsa/sum-array-elements-using-recursion/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 97,
    "url": "https://www.geeksforgeeks.org/dsa/reverse-a-string-using-recursion/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 98,
    "url": "https://www.geeksforgeeks.org/dsa/recursive-function-check-string-palindrome/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 99,
    "url": "https://leetcode.com/problems/powx-n/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "Handle negative exponents as well as positive exponents; use fast exponentiation."
  },
  {
    "id": 100,
    "url": "https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "The practice judge asks for the minimum move count; also trace the recursive moves for learning."
  },
  {
    "id": 101,
    "url": "https://www.geeksforgeeks.org/problems/find-distinct-elements--130928/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 102,
    "url": "https://www.geeksforgeeks.org/problems/first-repeating-element4018/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 103,
    "url": "https://leetcode.com/problems/two-sum/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 104,
    "url": "https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum--150253/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 105,
    "url": "https://www.geeksforgeeks.org/problems/subarray-with-0-sum-1587115621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 106,
    "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 107,
    "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 108,
    "url": "https://leetcode.com/problems/group-anagrams/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 109,
    "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 110,
    "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 111,
    "url": "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 112,
    "url": "https://leetcode.com/problems/3sum/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 113,
    "url": "https://leetcode.com/problems/container-with-most-water/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 114,
    "url": "https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 115,
    "url": "https://www.geeksforgeeks.org/dsa/longest-sub-array-sum-k/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Reference covers the more general integer-array version. For this task, use positive inputs and a sliding window; negative inputs require a different approach."
  },
  {
    "id": 116,
    "url": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 117,
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 118,
    "url": "https://www.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 119,
    "url": "https://leetcode.com/problems/maximum-subarray/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 120,
    "url": "https://leetcode.com/problems/maximum-product-subarray/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 121,
    "url": "https://leetcode.com/problems/maximum-sum-circular-subarray/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 122,
    "url": "https://www.geeksforgeeks.org/problems/implement-stack-using-array/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 123,
    "url": "https://leetcode.com/problems/valid-parentheses/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 124,
    "url": "https://www.geeksforgeeks.org/problems/reverse-a-string-using-stack/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 125,
    "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 126,
    "url": "https://leetcode.com/problems/implement-queue-using-stacks/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 127,
    "url": "https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 128,
    "url": "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 129,
    "url": "https://www.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 130,
    "url": "https://leetcode.com/problems/min-stack/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 131,
    "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 132,
    "url": "https://www.geeksforgeeks.org/dsa/singly-linked-list-tutorial/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Tutorial for creating a singly linked list and its traversal, insertion and deletion operations."
  },
  {
    "id": 133,
    "url": "https://www.geeksforgeeks.org/problems/count-nodes-of-linked-list/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 134,
    "url": "https://www.geeksforgeeks.org/problems/search-in-linked-list-1664434326/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 135,
    "url": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 136,
    "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 137,
    "url": "https://leetcode.com/problems/reverse-linked-list/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 138,
    "url": "https://leetcode.com/problems/linked-list-cycle/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 139,
    "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 140,
    "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 141,
    "url": "https://leetcode.com/problems/palindrome-linked-list/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 142,
    "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 143,
    "url": "https://www.geeksforgeeks.org/dsa/check-if-a-number-is-odd-or-even-using-bitwise-operators/",
    "platform": "GeeksforGeeks",
    "kind": "reference"
  },
  {
    "id": 144,
    "url": "https://www.geeksforgeeks.org/problems/check-whether-k-th-bit-is-set-or-not-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 145,
    "url": "https://leetcode.com/problems/number-of-1-bits/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 146,
    "url": "https://leetcode.com/problems/power-of-two/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 147,
    "url": "https://www.geeksforgeeks.org/dsa/swap-two-numbers/",
    "platform": "GeeksforGeeks",
    "kind": "reference",
    "note": "Use the bitwise XOR approach without a temporary variable."
  },
  {
    "id": 148,
    "url": "https://leetcode.com/problems/single-number/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 149,
    "url": "https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Find the missing value in 1..N using XOR; this is a deliberate technique revisit of problem #40."
  },
  {
    "id": 150,
    "url": "https://www.geeksforgeeks.org/problems/-minimum-number-of-coins4426/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Practice uses the denomination set {1, 2, 5, 10}; apply greedy only to the specified denominations."
  },
  {
    "id": 151,
    "url": "https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Activity-selection version; follow the platform's rule for activities that touch at their endpoints."
  },
  {
    "id": 152,
    "url": "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 153,
    "url": "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 154,
    "url": "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 155,
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 156,
    "url": "https://leetcode.com/problems/find-peak-element/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 157,
    "url": "https://leetcode.com/problems/koko-eating-bananas/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 158,
    "url": "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 159,
    "url": "https://www.geeksforgeeks.org/problems/aggressive-cows/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 160,
    "url": "https://leetcode.com/problems/subsets/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 161,
    "url": "https://www.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Return distinct permutations when characters repeat."
  },
  {
    "id": 162,
    "url": "https://leetcode.com/problems/generate-parentheses/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 163,
    "url": "https://leetcode.com/problems/combination-sum/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 164,
    "url": "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 165,
    "url": "https://leetcode.com/problems/n-queens/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 166,
    "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "platform": "LeetCode",
    "kind": "practice",
    "label": "Inorder"
  },
  {
    "id": 166,
    "url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
    "platform": "LeetCode",
    "kind": "practice",
    "label": "Preorder"
  },
  {
    "id": 166,
    "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    "platform": "LeetCode",
    "kind": "practice",
    "label": "Postorder"
  },
  {
    "id": 167,
    "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "The linked problem measures depth in nodes, not edges."
  },
  {
    "id": 168,
    "url": "https://www.geeksforgeeks.org/problems/size-of-binary-tree/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "label": "Count nodes"
  },
  {
    "id": 168,
    "url": "https://www.geeksforgeeks.org/problems/count-leaves-in-binary-tree/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "label": "Count leaves"
  },
  {
    "id": 169,
    "url": "https://leetcode.com/problems/same-tree/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 170,
    "url": "https://leetcode.com/problems/invert-binary-tree/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 171,
    "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 172,
    "url": "https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 173,
    "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "The linked problem measures diameter in edges."
  },
  {
    "id": 174,
    "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 175,
    "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    "platform": "LeetCode",
    "kind": "practice",
    "label": "Insert"
  },
  {
    "id": 175,
    "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "platform": "LeetCode",
    "kind": "practice",
    "label": "Search"
  },
  {
    "id": 176,
    "url": "https://leetcode.com/problems/validate-binary-search-tree/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 177,
    "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 178,
    "url": "https://leetcode.com/problems/climbing-stairs/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 179,
    "url": "https://leetcode.com/problems/fibonacci-number/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "Solve using memoization for this curriculum item; the platform accepts other approaches too."
  },
  {
    "id": 180,
    "url": "https://leetcode.com/problems/house-robber/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 181,
    "url": "https://leetcode.com/problems/unique-paths/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 182,
    "url": "https://leetcode.com/problems/minimum-path-sum/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 183,
    "url": "https://leetcode.com/problems/coin-change-ii/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 184,
    "url": "https://leetcode.com/problems/coin-change/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 185,
    "url": "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 186,
    "url": "https://leetcode.com/problems/longest-common-subsequence/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 187,
    "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 188,
    "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 189,
    "url": "https://leetcode.com/problems/edit-distance/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 190,
    "url": "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Follow the platform's starting-vertex and adjacency-order requirements."
  },
  {
    "id": 191,
    "url": "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "Follow the platform's starting-vertex and adjacency-order requirements."
  },
  {
    "id": 192,
    "url": "https://leetcode.com/problems/number-of-islands/",
    "platform": "LeetCode",
    "kind": "practice",
    "note": "This version uses horizontal and vertical adjacency only."
  },
  {
    "id": 193,
    "url": "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 194,
    "url": "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1",
    "platform": "GeeksforGeeks",
    "kind": "practice"
  },
  {
    "id": 195,
    "url": "https://leetcode.com/problems/rotting-oranges/",
    "platform": "LeetCode",
    "kind": "practice"
  },
  {
    "id": 196,
    "url": "https://www.geeksforgeeks.org/problems/topological-sort/1",
    "platform": "GeeksforGeeks",
    "kind": "practice",
    "note": "The practice task assumes a DAG; also handle cycle detection when implementing the general version."
  }
];
for (const p of root.DSA_BANK) p.links=resources.filter(r=>r.id===p.id).map(({id,...link})=>link);
})(typeof globalThis!=='undefined'?globalThis:this);
