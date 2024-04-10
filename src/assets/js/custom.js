function loadSidebar() {
    setTimeout(() => {
        // $('.layout-menu').hover(
        //     function () {
        //         if ($('html').hasClass('layout-menu-collapsed')) {
        //             $('html').addClass('layout-menu-hover'); //Add the active class to the area is hovered
        //         }
        //     },
        //     function () {
        //         $('html').removeClass('layout-menu-hover');
        //         //$('.layout-menu-toggle').addClass('d-block');
        //     }
        // );

        // $('.layout-menu-toggle').click(function () {
        //     $('html').toggleClass('layout-menu-collapsed');
        // }
        // )

        const menuItem = document.getElementById("menu-item-clients");
    
        // Check if the menu item is already open
        if (menuItem.classList.contains('open')) {
            menuItem.classList.remove('open');
        } else {
            menuItem.classList.add('open');
        }

        //dynamic add main.js to add in body
            var sv = document.createElement('script');
            sv.type = 'text/javascript';
            sv.src = 'assets/js/charts-apex.js';
            $('body').append(sv);
    
            var st = document.createElement('script');
            st.type = 'text/javascript';
            st.src = 'assets/js/apexcharts.js';
            $('body').append(st);
    
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'assets/js/main.js';
            $('body').append(s);
    
            var svc = document.createElement('script');
            svc.type = 'text/javascript';
            svc.src = 'assets/js/chartjs.js';
            $('body').append(svc);
    
            var sct = document.createElement('script');
            sct.type = 'text/javascript';
            sct.src = 'assets/js/charts-chartjs.js';
            $('body').append(sct);
        

        

    }, 1000);

};

