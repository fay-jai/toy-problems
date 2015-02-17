#
# write a function that takes a string of text and returns true if
# the parentheses are balanced and false otherwise.
#
# Example:
#   balanced_parens('(');  // false
#   balanced_parens('()'); // true
#   balanced_parens(')(');  // false
#   balanced_parens('(())');  // true
#
# Step 2:
#   make your solution work for all types of brackets
#
# Example:
#  balanced_parens('[](){}'); // true
#  balanced_parens('[({})]');   // true
#  balanced_parens('[(]{)}'); // false
#
# Step 3:
# ignore non-bracket characters
# balanced_parens(' var wow  = { yo: thisIsAwesome() }'); // true
# balanced_parens(' var hubble = function() { telescopes.awesome();'); // false
#

# Key Concepts:
# When resolving an identifier, if the identifier is a local variable, then
# check whether the current scope has it. If not, then an error will be thrown.
# If the identifier is not a keyword, then it will be an implicit method call
# to the 'self' object.

def balanced_parens(string)
  stack = []
  matching_character = { ')' => '(', ']' => '[', '}' => '{' }

  string.each_char do |char|
    if is_opening_character(char)
      stack.push(char)
    elsif is_closing_character(char)
      remove = stack.pop
      return false if matching_character[char] != remove
    end
  end

  return stack.length == 0
end

def is_opening_character(character)
  character == '(' || character == '[' || character == '{'
end

def is_closing_character(character)
  character == ')' || character == ']' || character == '}'
end

#
# Write a function `f(a, b)` which takes two strings as arguments and returns a
# string containing only the unique characters found in both strings, in the
# order that they appeared in `a`. Remember to skip spaces and characters you
# have already encountered!
#
# Example: common_characters('acexivou', 'aegihobu')
# Returns: 'aeiou'
#
# Extra credit: Extend your function to handle more than two input strings.
#

# def common_characters(a, b)
#   require 'set'
#
#   result    = ''
#   set_a     = Set.new a.split('')
#   set_b     = Set.new b.split('')
#   intersect = set_a & set_b
#
#   set_a.each do |char|
#     result += char if intersect.include? char
#   end
#
#   result
# end

def common_characters(a, b)
  hash_a    = create_hash_from_string(a)
  hash_b    = create_hash_from_string(b)
  intersect = in_common_hash(hash_a, hash_b)

  result = ''
  hash_a.each do |key, value|
    result += key if intersect[key]
  end
  result
end

def create_hash_from_string(string)
  hash = {}
  string.each_char do |char|
    hash[char] ||= true
  end
  hash
end

def in_common_hash(hash_one, hash_two)
  result = {}
  hash_one.each do |key, value|
    result[key] = true if hash_two[key]
  end
  result
end

#
# Write a function that generates every sequence of throws a single
# player could throw over a three-round game of rock-paper-scissors.
#
# Example:
#   [
#     [ // one possible three round game outcome
#       'rock',    // round 1
#       'paper',   // round 2
#       'scissors' // round 3
#     ],
#     [ // next possible three round game outcome
#       'rock',    // round 1
#       'paper',   // round 2
#       'rock'     // round 3
#     ],
#   etc...
#   ]
#
# Extra credit: Make your function return answers for any number of rounds.
#
# Example:
# rockPaperScissors(5); // => [['rock', 'rock', 'rock', 'rock', 'rock'], etc...]
#

def rock_paper_scissors(num)
  # base case
  return [] if num <= 0
  return [['rock'], ['paper'], ['scissors']] if num == 1

  # recursive case
  rock_paper_scissors(num - 1).reduce([]) do |acc, arr|
    acc + (['rock', 'paper', 'scissors'].map { |hand| arr + [hand] })
  end
end


#
# Given an array of values, produce all permutations of those values.
#

def permutations(array)
  len = array.length

  # base case
  return []      if len == 0
  return [array] if len == 1

  # recursive case
  first  = array.take 1

  permutations(array.drop(1)).reduce([]) do |acc, arr|
    for i in 0..arr.length # include the length as the final index
      acc.push(arr.take(i) + first + arr.drop(i))
    end
    acc
  end
end


#
# Given an array of values, produce an array of all the combinations of those values.
#

def combinations(array)
  len = array.length

  # base case
  return []      if len == 0
  return [array] if len == 1

  # recursive case
  first = array.take 1
  rest  = combinations array.drop(1)

  (rest.reduce([]) do |acc, arr|
    acc << (first + arr)
    acc << arr
  end) << first # reduce returns an array which I'm pushing first onto, and returning the entire expression
end


#
# Given a sorted array, perform binary search
#

def binary_search(sorted_array, value)
  _binary_search(0, sorted_array.length, sorted_array, value)
end

def _binary_search(start, last, array, value)
  mid = (start + last) / 2

  return (value == array[mid] ? mid : nil) if mid == start || mid == last
  return mid if value == array[mid]
  return _binary_search(start, mid, array, value) if value < array[mid]
  _binary_search(mid, last, array, value)
end


#
# Make an array method that can return whether or not a context array is a
# subset of an input array.  To simplify the problem, you can assume that both
# arrays will contain only strings.
#
# See http://en.wikipedia.org/wiki/Subset for more on the definition of a
# subset.
#
#
# Extra credit: Make the method work for arrays that contain any value,
# including non-strings.
#

def is_subset_of(base, input)
  require 'set'
  Set.new(input).subset? Set.new(base)
end


#
# In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:
#
# 1p piece
# 2p piece
# 5p piece
# 10p piece
# 20p piece
# 50p piece
# 1 euro (100p)
# 2 euro (200p)
#
# It is possible to make £2 in the following way:
#
# 1 * £1 + 1 * 50p + 2 * 20p + 1 * 5p + 1 * 2p + 3 * 1p
# How many different ways can £2 be made using any number of coins?
#
# Example usage of `makeChange`:
#
# There's only one way to make 1p. that's with a single 1p piece
# makeChange(1) === 1
#
# There's only two ways to make 2p. that's with two, 1p pieces or with a single 2p piece
# makeChange(2) === 2
#

def make_change(amt)
  _make_change(amt, available_coins(amt))
end

def available_coins(amt)
  [200, 100, 50, 20, 10, 5, 2, 1].find_all { |coin| amt >= coin }
end

def _make_change(amt, coin_array)
  # base cases
  return 0 if amt < 0
  return 1 if amt == 0

  # recursive case
  coin_array.reduce(0) do |acc, cur|
    acc + _make_change(amt - cur, available_coins(cur))
  end
end


#
#  Write a function that takes as its input a string and returns an array of
#  arrays as shown below sorted in descending order by frequency and then by
#  ascending order by character.
#
#
#       :: Example ::
#
#  character_frequency('mississippi') ===
#  [
#    ['i', 4],
#    ['s', 4],
#    ['p', 2],
#    ['m', 1]
#  ]
#
#       :: Gotcha ::
#
#  character_frequency('miaaiaaippi') ===
#  [
#    ['a', 4],
#    ['i', 4],
#    ['p', 2],
#    ['m', 1]
#  ]
#
#
#

def character_frequency(string)
  unsorted = convert_to_data_structure( create_string_hash(string) )

  unsorted.sort do |arr1, arr2|
    result = 0
    if arr1[1] > arr2[1]
      result = -1
    elsif arr1[1] < arr2[1]
      result = 1
    elsif arr1[0].ord < arr2[0].ord
      result = -1
    else
      result = 1
    end
    result
  end
end

def create_string_hash(string)
  hash = {}
  string.each_char do |char|
    hash[char] ||= 0
    hash[char] += 1
  end
  hash
end

def convert_to_data_structure(hash)
  hash.reduce([]) do |acc, arr|
    acc << arr
  end
end

#
# Anagram Detection
#
# Write a function that accepts two parameters, a parent and a child string.
# Determine how many times the child string - or an anagram of the of the child
# string - appears in the parent string. There is a solution which can be done
# in near instant time.
#
# f('AdnBndAndBdaBn', 'dAn') // 4 ("Adn", "ndA", "dAn", "And")
# f('AbrAcadAbRa', 'cAda') // 2
#

def num_anagrams(base, child)
  base_len  = base.length
  child_len = child.length

  # base case
  return 0 if base_len < child_len

  # recursive case: child string can be as large as base string
  total    = 0
  anagrams = create_anagrams child

  for i in 0..(base_len - child_len)
    str = base[i, child_len]
    total += 1 if anagrams.include? str
  end
  total
end

def create_anagrams(string)
  len = string.length

  # base cases
  return []       if len == 0
  return [string] if len == 1

  # recursive case
  first  = string[0]
  rest   = create_anagrams string[1...len]
  result = []

  for element in rest # string
    el_len = element.length
    for i in 0..el_len
      result << (element[0...i] + first + element[i...el_len])
    end
  end
  result
end


#
# Binary Search Tree Check
#
# Given a binary tree, check whether it’s a binary search tree or not.
#

def is_binary_search_tree?(node)
  FIXNUM_MAX = (2**(0.size * 8 -2) -1)
  FIXNUM_MIN = -(2**(0.size * 8 -2))

  _is_binary_search_tree(FIXNUM_MIN, FIXNUM_MAX, node)
end

def _is_binary_search_tree?(min, max, node)
  return true  if node == nil
  return false if node.value < min || node.value > max
  return _is_binary_search_tree(min, node.value, node.left) &&
         _is_binary_search_tree(node.value, max, node.right)
end


#
# Array Pair Sum
#
# Given an integer array, output all pairs that sum up to a specific value k.
# Consider the fact that the same number can add up to `k` with its duplicates
# in the array. For example the array is [1, 1, 2, 3, 4] and the desired sum
# is 4. Should we output the pair (1, 3) twice or just once? Also do we output
# the reverse of a pair, meaning both (3, 1) and (1, 3)? Let’s keep the output
# as short as possible and print each pair only once. So, we will output only
# one copy of (1, 3). Also note that we shouldn’t output (2, 2) because it’s
# not a pair of two distinct elements.
#
# Example
# f(10, [3, 4, 5, 6, 7]) // [ [6, 4], [7, 3] ]
# f(8, [3, 4, 5, 4, 4]) // [ [3, 5], [4, 4], [4, 4], [4, 4] ]
#
# Source
# http://www.ardendertat.com/2011/09/17/programming-interview-questions-1-array-pair-sum/
#

def array_pair_sum(num, array)
  len    = array.length
  result = []

  for start_at in 0..(len - 2)
    for end_at in (start_at + 1)..(len - 1)
      if array[start_at] + array[end_at] == num
        result << [ array[start_at], array[end_at] ]
      end
    end
  end

  result
end


#
# Find Even Occurring Element
#
# Given an integer array, one element occurs even number of times and all
# others have odd occurrences. Find the element with even occurrences.
#

def even_occurences(integer_array)
  hash = create_integer_hash integer_array

  result = hash.find_all do |key, value|
    value % 2 == 0
  end

  if result.length == 0
    raise 'All integers occur an odd number of times'
  elsif result.length == 1
    return result[0][0]
  else
    raise 'There are multiple even occurences'
  end
end

def create_integer_hash(integer_array)
  hash = {}
  integer_array.each do |num|
    hash[num] ||= 0
    hash[num] += 1
  end
  hash
end

#
# Flatten Array
#
# Write a function that accepts a multi dimensional array and returns a
# flattened version.
#
# my_flatten([1, 2, [3, [4], 5, 6], 7]) // [1, 2, 3, 4, 5, 6, 7]
#

def my_flatten(array)
  len = array.length

  # base case
  return array if len == 0

  # recursive case
  first = array[0]
  rest  = array[1...len]

  # ternary operator
  (first.class == Array ? my_flatten(first) : [ first ]) + my_flatten(rest)
end


#
# Integer Difference
#
# Write a function that accepts an array of random integers and an integer *n*.
# Determine the number of times where two integers in the array have the
# difference of *n*.
#
# f(4, [1, 1, 5, 6, 9, 16, 27]) // 3 (Due to 2x [1, 5], and [5, 9])
# f(2, [1, 1, 3, 3]) // 4 (Due to 4x [1, 3])
#

def integer_difference(num, array)
  len   = array.length
  total = 0

  for start_at in 0..(len - 2)
    for end_at in (start_at + 1)..(len - 1)
      total += 1 if (array[start_at] - array[end_at]).abs == num
    end
  end

  total
end

#
# Largest Palindrome
#
# Write a function that finds the largest palindrome in a string. All
# characters can be valid for the palindrome, including whitespace. In the
# string "I am a red racecar driver" - the largest palindrome would be
# "d racecar d".
#

def largest_palindrome(string)
  len    = string.length
  result = ''
  max    = 0

  for start_at in 0..(len - 1)
    for end_at in 0..(len - 1)
      str = string[start_at..end_at]
      if is_palindrome(str) && str.length > max
        result = str
        max    = str.length
      end
    end
  end

  result
end

def is_palindrome(string)
  string == string.reverse
end


#
# Longest Words
#
# Write a function that returns the longest word(s) from a sentence. The
# function should not return any duplicate words (case-insensitive).
#
# longest_words("You are just an old antidisestablishmentarian")
#   => ["antidisestablishmentarian"]
# longest_words("I gave a present to my parents") => ["present", "parents"]
# longest_words("Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo
# buffalo") => ["buffalo"] or ["Buffalo"]
#

def longest_words(string)
  require 'set'

  words        = string.split(' ').map { |word| word.downcase }
  max_num_char = words.reduce(0) { |acc, word| [ acc, word.length ].max }
  unique_set   = Set.new(words.find_all { |word| word.length == max_num_char })

  unique_set.to_a
end