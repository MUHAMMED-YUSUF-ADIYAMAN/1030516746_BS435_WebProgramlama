const React = require('react');
const { mount } = require('enzyme');
const {Game}  = require('../src/client/Game');

test("test oluşturuldu",()=>{
    const driver = mount(<Game/>);
});
test("resim testi", () => {
    const driver = mount(<Game/>);
    let card=driver.find('.kart').at(0);
    card.simulate('click');
    let srcName=card.find("img").prop("src");
    expect(srcName==='../img/kedi.webp'||srcName==='../img/kopek.webp');

})
test("çoklu  test", () => {
    let driver = mount(<Game/>);

    let card=driver.find('.kart').at(0);
    card.simulate('click');
    let srcName=card.find("img").prop("src");
    expect(srcName==='../img/kedi.webp'||srcName==='../img/kopek.webp');
    for (let i = 0; i < 10; i++) {

        let card = driver.find('.kart').at(0);
        card.simulate('click');
        let srcName = card.find("img").prop("src");
        expect(srcName === '../img/kedi.webp' || srcName === '../img/kopek.webp');
        driver = mount(<Game/>);
    }
})
test("şık seçme",()=>{
        const driver = mount(<Game/>);

        let card=driver.find('.kart').at(0);
        card.simulate('click');
        let card2=driver.find('.kart').at(1);
        card2.simulate('click');
        let srcName = card.find("img").prop("src");
        let srcName2 = card.find("img").prop("src");

        expect(srcName==='../img/kedi.webp'||srcName==='../img/kopek.webp'||
            srcName2==='../img/kedi.webp'||srcName==='../img/kopek.webp');

})

test("random kart",()=>{

    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * 3);
        const driver = mount(<Game/>);
        let card = driver.find('.kart').at(randomNumber);
        card.simulate('click');
        let srcName = card.find("img").prop("src");
        expect(srcName === '../img/kedi.webp' || srcName === '../img/kopek.webp');

    }
})
test("yeni oyun",()=>{
    const driver = mount(<Game/>);
    let card = driver.find('.kart').at(0);
    card.simulate('click');
    let srcName = card.find("img").prop("src");
    if (srcName === '../img/kedi.webp')
        expect(true);
    else
        card = driver.find('.kart').at(1);
        card.simulate('click');
        srcName = card.find("img").prop("src");
    if (srcName === '../img/kedi.webp')
        expect(true);
    // else
        // card = driver.find('.link');
        // card.simulate('click');
        // card = driver.find('.kart').at(0);
        // srcName=card.find("img").prop("src");
        // expect(srcName === '../img/default.webp')

})

