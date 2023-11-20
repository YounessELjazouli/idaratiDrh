<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Your App Title')</title>

    <!-- Inclure les liens vers les fichiers CSS nécessaires, comme Bootstrap -->
    <link rel="stylesheet" href="    https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!-- Inclure les liens vers d'autres fichiers CSS si nécessaire -->

    <!-- Inclure les scripts JavaScript nécessaires, comme jQuery et Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="././js/app.js"></script>

    <!-- Inclure d'autres scripts JavaScript si nécessaire -->
    @yield('scripts')
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="{{ url('/') }}">Your App Name</a>
        <!-- Ajouter d'autres éléments de navigation si nécessaire -->
    </nav>

    <div class="container mt-4">
        <!-- Contenu principal de la page -->
        @yield('content')
    </div>

    <!-- Inclure d'autres scripts JavaScript si nécessaire -->
    @yield('scripts')
</body>
</html>
