
const product =
{
    fakeDB: [],

    init() {

        this.fakeDB.push({ img: "p1.png", title: 'Fire tv Stick', price: `CDN$ 59.99`, bestPr: false });

        this.fakeDB.push({ img: "p2.png", title: 'Internal Solid State Drives', price: `CDN$ 89.99 `, bestPr: false });

        this.fakeDB.push({ img: "p3.png", title: 'Smart speaker', price: `CDN$ 114.99`, bestPr: false });

        this.fakeDB.push({ img: "p4.png", title: 'TP-Link', price: `CDN$ 16.99`, bestPr: false });

        this.fakeDB.push({ img: "p5.png", title: 'Kindle paper Writer', price: `CD N$ 49.99`, bestPr: false });

        this.fakeDB.push({ img: "best1.png", title: 'Replacement Bend', price: `CDN$ 15.99`, bestPr: true });

        this.fakeDB.push({ img: "best2.png", title: 'Towels', price: `CDN$ 10.99`, bestPr: true });

        this.fakeDB.push({ img: "best3.png", title: 'Exercise Mats', price: `CDN$ 25.81`, bestPr: true });

        this.fakeDB.push({ img: "best4.png", title: 'Home Gyms', price: `CDN$ 16.99`, bestPr: true });
    },

    getAllProducts() {
        return this.fakeDB;
    },

    fakeBestDB: [],
    getBestSellPro() {
        for (let index = 0; index < this.fakeDB.length; index++) {
            if (this.fakeDB[index].bestPr) {
                this.fakeBestDB.push(this.fakeDB[index]);
            }
        }
        return this.fakeBestDB;
    }

}
product.init();
module.exports = product;