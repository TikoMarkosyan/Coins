import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

//25000  1 * 20000 1*5000 1*20000
function App() {
    const [coins, setCoins] = useState([500,1000, 2000, 5000, 10000, 20000, 100000]);
    const [amount, setAmount] = useState(0);
    const [finalobject, setFinalobject] = useState({});
    let obj = {}
    let count = 0;
    const getRoundFigureCoinValue = (x) => {
        return (x * 10 - ((x * 10) % 10)) / 10;
    }
    const calculateCoins = (val, arr = coins) => {
    
        obj[count] = {}
        let largestPossibleCoin = 500;
        arr.forEach((x) => {
            if (val >= x) {
                largestPossibleCoin = x;
            }
        });
        let remainingCents = val % largestPossibleCoin;
   
        if (!obj[count][largestPossibleCoin]) {
            obj[count][largestPossibleCoin] = getRoundFigureCoinValue(
                (val / largestPossibleCoin).toFixed(1)
            )
            setFinalobject(obj)
        }
        count++;
        if (remainingCents && val > 1) {
            calculateCoins(remainingCents, arr);
        }
       console.log(obj)
        return largestPossibleCoin;

    }
    const possibleCoinsCombination = () => {
        let coins = [500, 1000, 2000, 5000, 10000, 20000, 100000];
        if (amount % 10 !== 0) {
            alert("please choose @nather count");
        } else {
            while (coins.length) {
                let largestPossibleCoin = calculateCoins(amount, coins) || 0;
                coins = coins.filter((x) => x < largestPossibleCoin);
            }
        }
    }
    console.log(finalobject);
    return (
        <div className="App">
            <input type="number" className="App-input" min={0} value={amount} onChange={(e) => { setAmount(e.target.value) }} />
            <input type="button" className="Button-input" value="get amount" onClick={() => { possibleCoinsCombination() }} />

            {

                Object.keys(finalobject).map((item, index) => {
                    return (<div key={index}>
                        {
                          Object.entries(finalobject[item]).map(([value, key], i) => {
                              return (
                                  <p key={i} className="forP">{key + "*" + value}</p>
                                )
                            })
                        }
                    </div>)
                })
            }
        </div>
  );
}

export default App;
