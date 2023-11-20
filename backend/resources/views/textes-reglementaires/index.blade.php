@extends('layouts.app')

@section('plugins.Datatables', true)

@section('title', 'Textes Réglementaires List')

@section('content_header')
@stop

@section('content')
    <div class="row">
        <div class="col-md-10 mx-auto">
            <!-- <div class="row my-5">
                <div class="col-md-6 mx-auto">
                    include('layouts.alert')
                </div>
            </div> -->
            <div class="card my-3">
                <div class="card-header mx-auto">
                    <h3 class="text-center text-uppercase">
                        Textes Réglementaires
                    </h3>
                </div>
                <div class="card-body">
                    <table id="myTable" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Numéro de Série</th>
                                <th>Qualité du Texte</th>
                                <th>Sujet</th>
                                <th>Référence</th>
                                <th>Date</th>
                                <th>Texte</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($textesReglementaires as $texteReglementaire)
                                <tr>
                                    <td>{{ $texteReglementaire->numero_serie }}</td>
                                    <td>{{ $texteReglementaire->qualite_texte }}</td>
                                    <td>{{ $texteReglementaire->sujet }}</td>
                                    <td>{{ $texteReglementaire->ref }}</td>
                                    <td>{{ $texteReglementaire->date }}</td>
                                    <td>{{ $texteReglementaire->texte }}</td>
                                    <td class="d-flex justify-content-center align-items-center">
                                        <a href="{{ route('textes-reglementaires.show', $texteReglementaire->numero_serie) }}" class="btn btn-sm btn-primary">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <a href="{{ route('textes-reglementaires.edit', $texteReglementaire->numero_serie) }}" class="btn btn-sm btn-warning mx-2">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <form id="deleteForm{{ $texteReglementaire->numero_serie }}" action="{{ route('textes-reglementaires.destroy', $texteReglementaire->numero_serie) }}" method="post">
                                            @csrf
                                            @method('DELETE')
                                        </form>
                                        <button onclick="deleteTexteReglementaire({{ $texteReglementaire->numero_serie }})" type="button" class="btn btn-sm btn-danger">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@stop

@section('css')
<style>
    /* Ajoutez du style personnalisé si nécessaire */
</style>
@stop

@section('js')

<script>
    $(document).ready(function () {
        $('#myTable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                // ... (copiez le code des boutons depuis votre version précédente)
            ],
            columnDefs: [
                {
                    targets: [5], // L'index de la colonne "Texte"
                    visible: false,
                    orderable: false
                }
            ]
        });
    });

    function deleteTexteReglementaire(numero_serie) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('deleteForm' + numero_serie).submit();
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your text reglementaire is safe :)',
                    'error'
                )
            }
        })
    }
</script>
@if(session()->has("success"))
<script>
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "{{ session()->get('success') }}",
        showConfirmButton: false,
        timer: 3500
    });
</script>
@endif


    

@stop
