# Program 1
def reverse_string(s):
    return s[::-1]

print(reverse_string("Green Gourmet"))

# Program 2
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

print(is_prime(17))
