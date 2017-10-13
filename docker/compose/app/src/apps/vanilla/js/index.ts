
const test = async function() {
    return await Promise.resolve(1);
}

test().then(() => alert('1'));
