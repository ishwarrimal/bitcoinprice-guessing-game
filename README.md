Live URL : [Link](https://ishwarrimal.github.io/bitcoinprice-guessing-game/)  
Demo video : [Link](https://www.loom.com/share/1ff7cfd916f64348a7d8f3129b311f09?sid=620be07a-1f87-441a-8cbe-3a849aad42b9)

# Checklist

- [x] The player can at all times see their current score and the latest available BTC price in USD
    - Using webhooks to get live bitcon price.
    - Browser local storage is used to fetch/save user score and persist it.
- [x] The player can choose to enter a guess of either “up” or “down“
- [x] After a guess is entered the player cannot make new guesses until the existing guess is resolved
- [x] The guess is resolved when the price changes and at least 60 seconds have passed since the guess was made
- [x] If the guess is correct (up = price went higher, down = price went lower), the user gets 1 point added to their score. If the guess is incorrect, the user loses 1 point.
- [x] Players can only make one guess at a time
- [x] New players start with a score of 0

Solution requirements:

- [x] The guesses should be resolved fairly using BTC price data from any available 3rd party API
- [ ] The score of each player should be persisted in a backend data store (AWS services preferred)
    - This requires adding login functionality to identify and create session for each user to store in the backend.
- [x] Please provide us a link to your deployed solution
- [-] Testing is encouraged
    - Given time constrain, I've written test case for utils file only
- [x] Optional: Players should be able to close their browser and return back to see their score and continue to make more guesses.
- [x] Describe the app's functionality as well as how to run and deploy the application to the best of your ability in a README file.
- [x] Please provide the project in a public git repository.

## Additional Implementation:
1. Used webhooks to fetch live price.
2. Used custom hooks to fetch live price and show the counter.
3. Integrated wtih Github actions for Continuous Delivery.
4. Mobile friendly.

# Future Scope:
- Using TS for robustness, reliability and maintanability.
- **Security**: Enabling authentication and authorization.
- **Internationalization**: Creating JSON file to store UI constants.
- **Leader board**: With login session, we can store the user score in databse.
- **Error Reporting**: Using tools like sentry to report any runtime error.
- **Analytics**: Tracking events of user interaction in tools.
- **Performance**: Can use code splitting and lazy loading with suspense fallback to improve perforamnce.
- **Testing Coverage**: maintaining a good coverage for tests