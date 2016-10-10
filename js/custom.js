$.noConflict();
jQuery(document).ready(function($){
    'use strict';
    /*$('.bxslider').bxSlider({
        slideWidth: 257,
        minSlides: 1,
        maxSlides: 4,
        slideMargin: 30,
        pager:false,
        control:true,
        auto:true
    });*/
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    $('input.calendar').val(dd+'/'+mm+'/'+yyyy);

    $('.calendar').datepicker({
    changeYear: true,
    changeMonth: true,
    dateFormat: 'dd/mm/yy',
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    minDate: 0,
    });

function customCheckbox(checkboxName){
    var checkBox = $('input[name="'+ checkboxName +'"]');
    $(checkBox).each(function(){
        $(this).wrap( "<span class='customCheckbox'></span>" );
        if($(this).is(':checked')){
            $(this).parent().addClass("selected");
        }
    });
    $(checkBox).click(function(){
        $(this).parent().toggleClass("selected");
    });
}
customCheckbox("custom");



    $(".item_inner .des_container .info").succinct({
            size: 70
    });
/*____________ OWL CAROUSEL  _____________*/    
    $(".owl-carousel").owlCarousel({
        navigation:true,
        items:3,
        pagination:false
    });
/*____________ FIXED HEADER  _____________*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 60){  
            $('.head-section').addClass("fixed");
        }
        else{
            $('.head-section').removeClass("fixed");
        }
    });

    new WOW().init();
/*____________ BACK TO TOP  _____________*/
    if($('#back-to-top').length){
        var scrollTrigger = 100,
        backToTop =function () {
            var scrollTop = $(window).scrollTop();
            if(scrollTop > scrollTrigger){
                $('#back-to-top').addClass('show');
            }else{
                $('#back-to-top').removeClass('show');
            }
        };
        backToTop();
        $(window).on('scroll',function(){
            backToTop();
        });
        $('#back-to-top').on("click",function(e){
            e.preventDefault();
            $('html, body').animate({
                scrollTop:0
            },700);
        });
    }
/*____________ TAB _____________*/
    $('ul.register a').click(function(){
        if($(this).is("#register-link")){
            $('#register_wrapper a[href="#register"]').tab('show');         
        }else{
            $('#register_wrapper a[href="#log-in"]').tab('show');
        }
    });
    
    $('#register_wrapper a').click(function (e) {
      e.preventDefault();
      $(this).tab('show')
    });
/*____________ FANCYBOX _____________*/
     $('.close-fancybox').click(function () {
        $.fancybox.close();
    });

    var pro_popup_txt = '\
        <div class="img_wrapper pull-left"> <img src=" " alt=" "> </div> \
        <div class="des pull-right item"> \
            <form action=""> \
                <ul class="list-unstyled"> \
                    <li> <h4></h4> </li> \
                    <li class="clearfix"> \
                        <span class="price pull-left"></span> \
                        <a href="" class="btn_fb pull-right"></a> \
                    </li> \
                    <li class="info"> \
                        <p style="margin-bottom:10px;">Tuổi thơ ai lớn lên mà không từng thưởng thức bánh khoai mì nướng. Bánh là sự kết hợp hài hòa giữa vị béo của nước cốt dừa, vị bùi bùi đặc trưng của đậu xanh, vị ngọt thanh tự nhiên của khoai mì.</p> \
                        <p>Tất cả tạo nên một hương vị tuyệt vời mà khi bạn đã ăn rồi là cứ muốn ăn nữa.</p> \
                    </li> \
                    <li> <label for="quantity">Số lượng:</label> <input type="text" value="1" id="quantity"/> </li> \
                    <li> <p><span>Thành phần:</span>Khoai mì, đường, sữa đặc, bơ, nước cốt dừa, dừa sợi, vani, trứng gà.</p> </li> \
                    <li> <p><span>Thời hạn sử dụng:</span>Dùng trong ngày.</p> </li> \
                </ul> \
                <a href="" class="btn btn_cart">Đặt hàng </a> \
            </form> \
        </div> \
    '; 
    $("#pro_popup").prepend(pro_popup_txt);

    $('.fancybox').fancybox({
        padding:0,
        helpers:{
            overlay:{
                css:{'background':'rgba(0,0,0,0.8)'}
            }
        },
        'transitionIn'  : 'elastic',
        'transitionOut' : 'elastic',
        'scrolling'   : 'no',
        'autoDimensions': true
    });
    
    
    $('.prod_fancybox').attr('rel', 'gallery').fancybox({
        padding:0,
        helpers:{
            overlay:{
                css:{'background':'rgba(0,0,0,0.8)'}
            }
        },
        'transitionIn'  : 'elastic',
        'transitionOut' : 'elastic',
        'scrolling'   : 'no',
        'autoDimensions': true,
        'beforeShow': function(current, previous){            
            // to access current a, use this.element
            var productDiv = this.element.parents('li');
            var productImg = $(productDiv).find('.img_container img').attr('src').split('/');
            var file = productImg[productImg.length-1];
            var name = $(productDiv).find('h5.pro_name a').text();
            var price = $(productDiv).find('.price_box .price').text();

            var lightbox = $(this).attr("href");
            $(lightbox).find('.img_wrapper img').attr('src', 'images/large/'+file);
            $(lightbox).find('.des .price').text(price);
            $(lightbox).find('.des h4').text(name);
        }
    });
    
/*____________ VALIDATE _____________*/

    $.validator.addMethod("email", function(value, element) {
      // allow any non-whitespace characters as the host part
      return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:\S{1,63})$/.test( value );
    }, 'Please enter a valid email address.');

    $(".wrapper-dropdown-1 span").click(function(){
        $(".wrapper-dropdown-1").toggleClass('active');
    })

    $(".dropdown li a").click(function(){
        var text = $(this).html();
        $('.dropdown-label').html(text).addClass('normal-color');
        $("#district").val(text);
        $(".wrapper-dropdown-1").removeClass("active");
        return false;
    })

    $("#frm_cart").validate({
        ignore: "",
        rules: {
            username: "required",
            phone: {
                required:true,
                number:true
            },
            district: "required",
            // compound rule
            email: {
              required: true,
              email: true
            },
            address:"required",
            custom:{
              required:true,
              minlength:1
            }
        },
        messages:{
            custom:{
                required:"Bạn phải chọn ít nhất 1 lựa chọn. "
            }
        },
        errorPlacement: function( label, element ) {
            if( element.attr( "name" ) === "custom" ) {
                element.parents(".checkbox_group").append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
            } else {
                label.insertAfter( element ); // standard behaviour
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $("span.dropdown-label").addClass(errorClass);
        } 
    });

    $("#log-in-frm").validate({
        rules:{
            email:{
                required:true,
                email:true
            },
            pass:{
                required:true,
                minlength:5
            }
        },
        messages:{
            email:{
                required:"Vui lòng nhập email",
                email:"Email không hợp lệ."
            },
            pass:{
                required:"Vui lòng nhập mật khẩu",
                minlength:"Mật khẩu phải có ít nhất 5 kí tự."
            }
        },
        success: function(label) {
                label.text("Hợp lệ!").addClass("success");
        }           
    });
    $("#register-frm").validate({
        rules:{
            username:{
                required:true,
                minlength:2
            },
            pass:{
                required:true,
                minlength:5
            },
            confirm_pass:{
                required:true,
                minlength:5,
                equalTo:"#pass"
            },
            email:{
                required:true,
                email:true
            },
            address: {
                required:true,
                minlength:2
            },
            phone:{
                required:true,
                number:true
            }
        },
        messages:{
            username:{
                required:"Vui lòng nhập tên bạn.",
                minlength:"Tên bạn phải có ít nhất 2 kí tự."
            },
            pass:{
                required:"Vui lòng nhập mật khẩu",
                minlength:"Mật khẩu phải có ít nhất 5 kí tự."
            },
            confirm_pass:{
                required:"Vui lòng nhập lại mật khẩu",
                minlength:"Mật khẩu phải có ít nhất 5 kí tự.",
                equalTo:"Mật khẩu không trùng khớp."
            },
            email:{
                required:"Vui lòng nhập email",
                email:"Email không hợp lệ."
            },
            address: {
                required:"Vui lòng nhập địa chỉ.",
                minlength:"Bạn phải nhập ít nhất 2 kí tự."
            },
            phone:{
                required:"Vui lòng nhập số điện thoại",
                number:"Bạn phải nhập số ."
            }
        },
        success: function(label) {
                label.text("Hợp lệ!").addClass("success");
        }    
    });
    
/*____________ SMOOTHSCROLL _____________*/
    $('#cssmenu a[href="#home"]').click(function(event) {
        event.preventDefault();
        var link = this;
        $.smoothScroll({
          scrollTarget: '#home'
        });
    }); 
    $('#cssmenu a[href="#product"]').click(function(event) {
        event.preventDefault();
        var link = this;
        $.smoothScroll({
          scrollTarget: '#product'
        });
    }); 
    $('#cssmenu a[href="#contact"]').click(function(event) {
        event.preventDefault();
        var link = this;
        $.smoothScroll({
          scrollTarget: '#contact'
        });
    }); 
    $('#cssmenu a[href="#price_section"]').click(function(event) {
        event.preventDefault();
        var link = this;
        $.smoothScroll({
          scrollTarget: '#price_section',
        });   
    }); 
    /*____________ GMAP3 _____________*/
    $(".gmap3").gmap3({
          map:{
            options:{
              center:[10.794432, 106.614693],
              zoom: 15,
              scrollwheel: false
            }
          },
          marker:{
            values:[
              {latLng:[10.794537, 106.609908], data:"Baa&Boo chi nhánh 1", options:{icon: "images/marker.png"}},
              {latLng:[10.795886, 106.622696], data:"Baa&Boo chi nhánh 2", options:{icon: "images/marker.png"}},
              {latLng:[10.788867, 106.613041], data:"Baa&Boo chi nhánh 3", options:{icon: "images/marker.png"}}
            ],
            options:{
              draggable: false
            },
            events:{
              mouseover: function(marker, event, context){
                var map = $(this).gmap3("get"),
                  infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.open(map, marker);
                  infowindow.setContent(context.data);
                } else {
                  $(this).gmap3({
                    infowindow:{
                      anchor:marker, 
                      options:{content: context.data}
                    }
                  });
                }
              },
              mouseout: function(){
                var infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.close();
                }
              }
            }
          }
        });
});


