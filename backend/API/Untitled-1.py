def climb_stairs(n):
    if n <= 1:
        return 1
    # Initialize the base cases
    dp = [0] * (n + 1)
    print(dp)
    dp[0] = 1
    dp[1] = 1
    
    # Fill the dp array
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# Example usage:
n = 5
print(f"Number of ways to climb {n} steps: {climb_stairs(n)}")
