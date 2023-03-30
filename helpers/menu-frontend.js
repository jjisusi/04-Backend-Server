const getMenuFrontEnd = (role) => {
    let menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'rxjs', url: 'rxjs' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'ProgressBar', url: 'progress' },
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Usuarios', url: 'usuarios', 'role': 'ADMIN_ROLE' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' }
            ]
        },
    ];

    return menu.filter(menu => {
        if (!menu.role || menu.role === role) {
            const submenu = menu.submenu.filter(submenu => {
                return (!submenu.role || submenu.role === role)
            });
            menu.submenu=submenu;
            return true
        }
    });
}
module.exports = {
    getMenuFrontEnd
}