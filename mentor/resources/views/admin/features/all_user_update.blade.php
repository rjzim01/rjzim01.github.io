{{-- <form action="">
    @csrf
    <h1>{{$users->name}}</h1>
</form> --}}
{{-- <h1>{{$profileData->name}}</h1> --}}

<div>
    <label>Name</label>
    <input type="text" name="name" value="{{ $user->name }}" >
    {{-- <label>Description (optional)</label>
    <textarea cols="10" rows="5" name="description" value="{{ $user->description }}">{{ $user->description }}</textarea> --}}
</div>
