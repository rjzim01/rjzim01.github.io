<form method="post" action="{{route('store_post')}}">
    @csrf
    <label for="">name</label>
    <input type="text" name="name">
    <button type="submit">submit</button>
</form>