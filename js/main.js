$(document).ready(function() {
    function e(e) {
        var t = $(e).parent(), n = false;
        if (e.value === "" || e.value === $(e).attr("placeholder")) {
            n = true
        } else {
            if (e.name === "email") {
                if (!i(e.value)) {
                    n = true
                }
            }
        }
        if (n) {
            t.removeClass("valid").addClass("error")
        } else {
            t.removeClass("error").addClass("valid")
        }
        return n
    }
    function t() {
        if ($(window).width() < 768) {
            $(".page-text").fitText(4, {})
        } else {
            $(".page-text").fitText(3);
            $("#pedigree .page-text").fitText(2.4);
            $("#contact .page-text").fitText(3.6)
        }
        $(".page").css({minHeight: $(window).height()});
        $(".page").each(function() {
            var e = $(this);
            if ($(".article-container", e).length) {
                var t = $(".article-container", e).first(), n = t.height(), r = parseInt(e.css("padding-top").replace("px", ""), 10) + 10;
                if (n + r < $(window).height()) {
                    t.css({top: "50%",marginTop: n / -2 + "px"});
                    e.css({height: "auto"})
                } else {
                    t.css({top: r,marginTop: 0});
                    console.log(t, n, r);
                    e.css({height: t.outerHeight() + r})
                }
            }
        });
        if (window.location.hash) {
            n(window.location.hash.replace(/^#!\//, "#"))
        }
        $(".page-text").each(function() {
            if ($(this).parent().find("img").length) {
                $(this).css({height: $(this).parent().find("img").first().height()})
            }
        });
        if ($("#contact > .article-container > section").length > 1) {
            var e = 1, t = $("#contact > .article-container > section");
            t.each(function(n) {
                if (t.eq(e).height() <= $(this).height())
                    ;
                e = $(this).index()
            });
            e--;
            t.each(function(n) {
                if (n !== e) {
                    $(this).height(t.eq(e).height())
                }
            })
        }
        $("#infoPanel, #infoPanel > article").height($(window).height() - ($(".header-container").outerHeight() + $(".footer-container").outerHeight()));
        $("#infoPanel, #infoPanel > article").css({bottom: $(".footer-container").outerHeight()})
    }
    function n(e) {
        var t = $(e);
        scrollingTop = true;
        r(e.replace("#", ""));
        $("html, body").stop().animate({scrollTop: t.offset().top}, 600, "swing", function() {
            window.location.hash = "#!/" + t.attr("id");
            scrollingTop = false
        })
    }
    function r(e) {
        $(".header-container nav li.current").removeClass("current");
        $("#nav-link-" + e).addClass("current")
    }
    function i(e) {
        var t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return t.test(e)
    }
    $(".page, .hide").hide();
    $(".hide").removeClass("hide");
    if ($("html").hasClass("lt-ie9")) {
        $("#home-arrow").attr("src", "img/ie8/home-arrow.png");
        $("#home-arrow").attr("data-src", "img/ie8/home-arrow-hover.png")
    }
    $("img").each(function() {
        if (typeof $(this).attr("data-src") !== "undefined") {
            $("<img/>")[0].src = $(this).attr("data-src")
        }
    });
    $("img[data-src]").hover(function() {
        var e = this.src;
        this.src = $(this).attr("data-src");
        $(this).attr("data-src", e)
    });
    scrollingTop = false;
    $(window).load(function() {
        $(".page, #infoPanel").show();
        t();
        $(".page").css({opacity: 0}).animate({opacity: 1}, 600);
        $(".scrollable").each(function() {
            $(this).jScrollPane({autoReinitialise: true,verticalGutter: 30,mouseWheelSpeed: 40})
        }).promise().done(function() {
            $(".scollable").hide();
            $("#infoPanel").slideToggle(1).css({zIndex: 10})
        })
    });
    $(window).resize(function() {
        t()
    });
    $(window).on("scroll", function() {
        if (!$("#infoPanel").is(":visible") && !scrollingTop) {
            var e = $(window).scrollTop(), t = new Array;
            $(".page").each(function() {
                t.push([$(this).attr("id"), $(this).offset().top - parseInt($(this).css("padding-top").replace("px", ""), 10) - $(window).height() * .33])
            });
            var n = 0, i = false;
            while (!i && n < t.length) {
                if (e >= t[n][1]) {
                    if (n + 1 === t.length || e < t[n + 1][1]) {
                        i = true
                    }
                }
                n++
            }
            if (i) {
                var s = t[--n][0];
                r(s);
                if (!$(".ua-ios").length)
                    window.location.hash = "#!/" + s
            }
        }
    });
    $('.footer-container a[href^="#"]').on("click", function(e) {
        e.preventDefault();
        if ($("#infoPanel").is(":visible")) {
            var t = this.hash;
            $("#infoPanel").slideToggle(300, function() {
                $("#infoPanel > article").hide();
                $(t).show();
                $("#infoPanel").slideToggle(600)
            })
        } else {
            $("#infoPanel > article").hide();
            $(this.hash).show();
            $("#infoPanel").slideToggle(600)
        }
    });
    $('.close a[href^="#"]').on("click", function(e) {
        e.preventDefault();
        var t = $(this).parents("article");
        $("#infoPanel").slideToggle(600, function() {
            t.hide()
        })
    });
    $('a[href^="#"]:not(.noscoll)').on("click", function(e) {
        e.preventDefault();
        n(this.hash)
    });
    $("input, textarea", $(".ua-ios form")).on("focusin", function() {
        setTimeout(function() {
            $(".header-container").css({position: "absolute",top: $(window).scrollTop()})
        }, 1)
    });
    $("input, textarea", $(".ua-ios form")).on("focusout", function() {
        setTimeout(function() {
            $(".header-container").css({position: "fixed",top: 0})
        }, 1)
    });
    $('input:not([type="submit"]):not([type="hidden"]), textarea', $("#contact form")).on("blur", function() {
        e(this)
    });
    $("#contact form").on("submit", function(t) {
        t.preventDefault();
        var r = $(this), i = false;
        $('input:not([type="submit"]):not([type="hidden"]), textarea', r).each(function() {
            var t = e(this);
            if (!i) {
                i = t
            }
        });
        if (!i) {
            $.ajax({type: "POST",url: this.action,data: r.serializeArray(),beforeSend: function() {
                    r.find('input[type="submit"]').attr("disabled", "disabled");
                    if ($(".ua-ios form").length) {
                        setTimeout(function() {
                            n("#contact")
                        }, 1)
                    }
                },complete: function() {
                    r.find('input[type="submit"]').removeAttr("disabled")
                //},success: function(e) {
                	var e = 'Your message has been correctly sent.\n\nThank you.';

                    alert(e);
                    r[0].reset();
                    $("> div", r).removeClass("error valid")
                }})
        } else {
            alert("Unfortunately, your message could not be sent.\nPlease check your details and try again.");
            if ($(".ua-ios form").length) {
                setTimeout(function() {
                    n("#contact")
                }, 1)
            }
            return false
        }
    })
});
