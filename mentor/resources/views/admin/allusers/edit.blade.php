<section>
    <form method="post"  enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="titlebar">
            <h1>Edit Product</h1>
            {{-- <button>Save</button> --}}
        </div>

        <div class="card">
            <div>
                <label>Name</label>
                <input type="text" name="name" value="{{ $user->name }}" >
            </div>
            <h1>{{ $user->email }} h</h1>
            {{-- <div>
                <label>Quantity</label>
                <input type="text" name="quantity" value="{{ $product->quantity }}" >
                <hr>
                <label>Price</label>
                <input type="text" name="price" value="{{ $product->price }}" >
            </div> --}}
        </div>

        <div class="titlebar">
            <h1></h1>
            <input type="hidden" name="hidden_id" value="{{$user->id}}">
            <button>Save</button>
        </div>
    </form>
</section>