; function index() {
    // app下载显示与隐藏
    const download = document.querySelector('.download')
    const downloa_app = document.querySelector('.downloa_app')
    download.addEventListener('mouseenter', function () {
        downloa_app.style.display = 'block'
    })
    download.addEventListener('mouseleave', function () {
        downloa_app.style.display = 'none'
    })

    // 地区选择
    const optionUp = document.querySelector('.header-location_fl>span')
    const optionbelow = document.querySelectorAll('.option span')
    for (let i = 0; i < optionbelow.length; i++) {
        optionbelow[i].addEventListener('click', function () {
            optionUp.innerHTML = optionbelow[i].innerHTML
            document.querySelector('.option .option_span_style').classList.remove('option_span_style')
            document.querySelector(`.option span:nth-child(${i + 1})`).classList.add('option_span_style')
        })
    }

    // 搜索框
    const search_item = document.querySelector('.search-item')
    const searchI = document.querySelector('.search-item i')
    const input_text = document.querySelector('.input-text')
    const input_span = document.querySelector('.input-span')
    const main = document.querySelector('main')
    search_item.addEventListener('click', function () {
        searchI.style.display = 'inline-block'
        input_text.style.display = 'inline-block'
        input_span.style.display = 'inline-block'
        search_item.style.border = "2.1px solid #0052fe"
    })
    main.addEventListener('click', function () {
        searchI.style.display = 'none'
        input_text.style.display = 'none'
        input_span.style.display = 'none'
        search_item.style.border = "2.1px solid transparent"
    })
    // 工作地点
    const work_line_style = document.querySelectorAll('.work_line_fr .ac_style')
    for (let i = 0; i < work_line_style.length; i++) {
        work_line_style[i].addEventListener('mouseenter', function () {
            document.querySelector('.work_line_style').classList.remove('work_line_style')
            this.classList.add('work_line_style')
            document.querySelector('.work_line_right1 .wlrc-item').classList.remove('wlrc-item')
            document.querySelector(`.work_line_right1 .wlrc:nth-child(${i + 1})`).classList.add('wlrc-item')
        })
    }
    // 工作周期，时期，类型
    const sc_span = document.querySelectorAll('.sc_content .spang')
    const sc_img = document.querySelectorAll('.sc_content img')
    for (let i = 0; i < sc_span.length; i++) {
        sc_span[i].addEventListener('mouseenter', function () {
            sc_img[i].style.transform = 'rotate(180deg)'
        })
        sc_span[i].addEventListener('mouseleave', function () {
            sc_img[i].style.transform = 'rotate(0deg)'
        })
        sc_img[i].addEventListener('mouseleave', function () {
            sc_img[i].style.transform = 'rotate(0deg)'
        })
        sc_img[i].addEventListener('mouseenter', function () {
            sc_img[i].style.transform = 'rotate(180deg)'
        })
    }
    // 工作周期，时期，类型------下拉框
    const sc_content_span1 = document.querySelectorAll('.sc_content-none1 span')
    for (let i = 0; i < sc_content_span1.length; i++) {
        sc_content_span1[i].addEventListener('click', function () {
            document.querySelector('.sc_content-none1 .p_style1').classList.remove('p_style1')
            this.classList.add('p_style1')
        })
    }
    const sc_content_span2 = document.querySelectorAll('.sc_content-none2 span')
    for (let i = 0; i < sc_content_span2.length; i++) {
        sc_content_span2[i].addEventListener('click', function () {
            document.querySelector('.sc_content-none2 .p_style2').classList.remove('p_style2')
            this.classList.add('p_style2')
        })
    }
    const sc_content_span3 = document.querySelectorAll('.sc_content-none3 span')
    for (let i = 0; i < sc_content_span3.length; i++) {
        sc_content_span3[i].addEventListener('click', function () {
            document.querySelector('.sc_content-none3 .p_style3').classList.remove('p_style3')
            this.classList.add('p_style3')
        })
    }
}