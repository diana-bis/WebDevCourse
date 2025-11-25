//this is a map
let userObj =
{
    username: "diana",
    grade: 85,
    password: "pass123",
    isConnected: true,
    address: {
        country: "israel",
        city: "KASH",
        street: "ben gurion 10",
        number: "123",
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 90, 100, 85]
}

let newGrade = userObj.grade + 10;
userObj.grade += 10;
userObj.id = 1000; // adds new element to map

let userObj2 = userObj;
userObj.grade += 10; // changes grade of userobj2 to +=10
userObj2.grade = 0;
let grade1 = userObj.grade; // grade of userobj changed to 0 too

userObj.address.street = "";
userObj["address"].city = "telaviv";

let arr = [userObj, {
    username: "diana",
    grade: 85,
    password: "pass123",
    isConnected: true,
    address: {
        country: "israel",
        city: "KASH",
        street: "ben gurion 10",
        number: "123",
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 90, 100, 85]
}]

arr[0].allGrades[1] = { CPP: 80 };
arr[1].avg = 95;
let user2 = arr[1];
user2.password = "12345";