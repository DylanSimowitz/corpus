export interface SearchResponseRoot {
  searchResponse: SearchResponse;
}
export interface SearchResponse {
  feedItems: FeedItem[];
  nextPageCursor: string;
  operation_context: string;
  sort: Sort;
  filters: Filter[];
  searchQuery: SearchQuery;
  filterQuery: FilterQuery;
}

export interface FeedItem {
  type: string;
  tile_id: string;
  item: Item;
}

export interface Item {
  offer_count: number;
  distance: number;
  get_img_medium_height: number;
  post_date: string;
  get_img_medium_width: number;
  owner: Owner;
  watched: boolean;
  get_img_small_width: number;
  id: number;
  category: Category;
  location_name: string;
  get_img_small_height: number;
  title: string;
  post_date_ago: string;
  get_full_url: string;
  priority: number;
  state: number;
  longitude: number;
  latitude: number;
  get_img_permalink_medium: string;
  sort_label: string;
  description: string;
  paid: boolean;
  payable: boolean;
  image_mob_det_hd: string;
  image_mob_list_hd: string;
  listing_type: number;
  condition: number;
  post_from_store_address: string;
  photos: Photo[];
  get_img_permalink_small: string;
  get_img_permalink_large: string;
  price: string;
  shipping_attributes: ShippingAttributes;
  generic_attributes: any;
  visible: boolean;
  vehicle_attributes?: VehicleAttributes;
}

export interface Owner {
  first_name: string;
  get_profile: GetProfile;
  click_to_call_enabled: boolean;
  id: number;
  identity_attributes: IdentityAttributes;
  date_joined: string;
  softBlocked: boolean;
  active: boolean;
}

export interface GetProfile {
  rating: Rating;
  card_on_file: boolean;
  verified: number;
  payments_verified: boolean;
  avatar_normal: string;
  has_facebook: boolean;
  avatar_square: string;
  public_location_name: string;
  not_active: boolean;
  uses_default_avatar: boolean;
}

export interface Rating {
  count: number;
  average: number;
}

export interface IdentityAttributes {
  is_truyou_member: boolean;
  autos_dealer_payment_info_on_file: boolean;
  is_autos_dealer: boolean;
  is_small_business: boolean;
  potential_autos_seller: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Photo {
  uuid: string;
  images: Images;
}

export interface Images {
  detail_full: DetailFull;
  detail: Detail;
  list: List;
}

export interface DetailFull {
  url: string;
  width: number;
  height: number;
}

export interface Detail {
  url: string;
  width: number;
  height: number;
}

export interface List {
  url: string;
  width: number;
  height: number;
}

export interface ShippingAttributes {
  shipping_enabled: boolean;
  shipping_parcel_id?: string;
  shipping_price: number;
  show_as_shipped: boolean;
  can_ship_to_buyer: boolean;
  buy_it_now_enabled: boolean;
  seller_pays_shipping: boolean;
  feed_show_shipping_icon: boolean;
  seller_manages_shipping: boolean;
  empty: boolean;
}

export interface VehicleAttributes {
  vehicle_id: string;
  vehicle_make: string;
  vehicle_miles: string;
  vehicle_model: string;
  vehicle_style_display: string;
  vehicle_year: string;
  empty: boolean;
}

export interface Sort {
  position: string;
  type: string;
  name: string;
  label: string;
  label_short: string;
  query_param: string;
  options: Option[];
  sort_value: string;
}

export interface Option {
  label: string;
  label_short: string;
  value: string;
  selected?: boolean;
  default?: boolean;
}

export interface Filter {
  position: string;
  type: string;
  name: string;
  label: string;
  label_short: string;
  query_param?: string;
  options: Option2[];
  priority: number;
  delivery_param_value?: string;
  filtered: boolean;
  radius_value?: string;
  units?: string;
  left_query_param?: string;
  right_query_param?: string;
  price_min_value?: string;
  price_max_value?: string;
}

export interface Option2 {
  label: string;
  label_short?: string;
  value?: string;
  default?: boolean;
  selected?: boolean;
  text_hint?: string;
}

export interface SearchQuery {
  limit: string;
}

export interface FilterQuery {
  q: string;
  sort: string;
}
